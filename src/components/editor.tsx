import Quill, { QuillOptions } from 'quill'
import { Delta, Op } from 'quill/core'
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { PiTextAa } from 'react-icons/pi'
import { MdSend } from 'react-icons/md'
import { ImageIcon, Smile, XIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { cn } from '@/lib/utils'
import { EmojiPopover } from '@/components/emoji-popover'

import 'quill/dist/quill.snow.css'

//! Component exported as default => in order to dynamicly import it's packages

type EditorValue = {
  image: File | null
  body: string
}

interface EditorProps {
  variant?: 'create' | 'update'
  onSubmit: (value: EditorValue) => void
  onCancel?: () => void
  placeholder?: string
  defaultValue?: Delta | Op[]
  disabled?: boolean
  innerRef?: MutableRefObject<Quill | null>
}

export default function Editor({
  variant = 'create',
  onSubmit,
  defaultValue = [],
  disabled = false,
  innerRef,
  onCancel,
  placeholder = 'Write something ...',
}: EditorProps) {
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isToolbarVisible, setIsToolbarVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  const submitRef = useRef(onSubmit)
  const placeholderRef = useRef(placeholder)
  const quillRef = useRef<Quill | null>(null)
  const defaultValueRef = useRef(defaultValue)
  const disabledRef = useRef(disabled)
  const imageElementRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    submitRef.current = onSubmit
    placeholderRef.current = placeholder
    defaultValueRef.current = defaultValue
    disabledRef.current = disabled
  })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div'),
    )
    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ['bold', 'italic', 'strike'],
          ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                return
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, '\n')
              },
            },
          },
        },
      },
    }
    const quill = new Quill(editorContainer, options)
    quillRef.current = quill
    quillRef.current.focus()

    if (innerRef) {
      innerRef.current = quill
    }

    quill.setContents(defaultValueRef.current)
    setText(quill.getText())

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText())
    })

    return () => {
      quill.off(Quill.events.TEXT_CHANGE)

      if (container) {
        container.innerHTML = ''
      }
      if (quillRef.current) {
        quillRef.current = null
      }
      if (innerRef) {
        innerRef.current = null
      }
    }
  }, [innerRef])

  function toggleToolbar() {
    setIsToolbarVisible((show) => !show)

    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar')

    if (toolbarElement) {
      toolbarElement?.classList.toggle('hidden')
    }
  }

  function onEmojiSelect(emoji: any) {
    const quill = quillRef.current

    quill?.insertText(quill.getSelection()?.index || 0, emoji.native)
  }

  const isEmpty = text.replace(/<(.|\n)*?>/g, '').trim().length == 0

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={(e) => setImage(e.target.files![0])}
        className="hidden"
      />
      <div className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm">
        <div ref={containerRef} className="ql-custom h-full" />
        {!!image && (
          <div className="p-2">
            <div className="group/image relative flex size-[62px] items-center justify-center">
              <Hint label="Remove image">
                <button
                  onClick={() => {
                    setImage(null)
                    imageElementRef.current!.value = ''
                  }}
                  className="absolute -right-2.5 -top-2.5 z-[4] hidden size-6 items-center justify-center rounded-full border-2 border-white bg-black/70 text-white hover:bg-black group-hover/image:flex"
                >
                  <XIcon className="size-3.5" />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="uploaded"
                fill
                className="overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        )}
        <div className="z-[5] flex px-2 pb-2">
          <Hint
            label={isToolbarVisible ? 'Hide formatting' : 'Show formatting'}
          >
            <Button
              disabled={disabled}
              size="icon-sm"
              variant="ghost"
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size="icon-sm" variant="ghost">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>

          {variant === 'update' && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {}}
                disabled={disabled || isEmpty}
                className="bg-[#007a5a] text-white hover:bg-[#007a5a]/80"
              >
                Save
              </Button>
            </div>
          )}

          {variant === 'create' && (
            <Hint label="Image">
              <Button
                disabled={disabled}
                size="icon-sm"
                variant="ghost"
                onClick={() => imageElementRef.current?.click()}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}

          {variant === 'create' && (
            <Button
              className={cn(
                'ml-auto',
                isEmpty
                  ? 'bg-white text-muted-foreground hover:bg-white'
                  : 'bg-[#007a5a] text-white hover:bg-[#007a5a]/80',
              )}
              size="icon-sm"
              onClick={() => {}}
              disabled={disabled || isEmpty}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {variant == 'create' && (
        <div
          className={cn(
            'flex justify-end p-2 text-[10px] text-muted-foreground opacity-0 transition',
            !isEmpty && 'opacity-100',
          )}
        >
          <p>
            <strong>Shift + Enter</strong> to add a new line.
          </p>
        </div>
      )}
    </div>
  )
}
