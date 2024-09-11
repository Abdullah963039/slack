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
import { ImageIcon, Smile } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { cn } from '@/lib/utils'

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
  const [isToolbarVisible, setIsToolbarVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  const submitRef = useRef(onSubmit)
  const placeholderRef = useRef(placeholder)
  const quillRef = useRef<Quill | null>(null)
  const defaultValueRef = useRef(defaultValue)
  const disabledRef = useRef(disabled)

  useLayoutEffect(() => {
    submitRef.current = onSubmit
    placeholderRef.current = placeholder
    quillRef.current = null
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
  const isEmpty = text.replace(/<(.|\n)*?>/g, '').trim().length == 0

  return (
    <div className="flex flex-col">
      <div className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm">
        <div ref={containerRef} className="ql-custom h-full" />
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

          <Hint label="Emoji">
            <Button
              disabled={disabled}
              size="icon-sm"
              variant="ghost"
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>

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
                onClick={() => {}}
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
      <div className="flex justify-end p-2 text-[10px] text-muted-foreground">
        <p>
          <strong>Shift + Enter</strong> to add a new line.
        </p>
      </div>
    </div>
  )
}
