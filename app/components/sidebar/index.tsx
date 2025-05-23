import React, { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline'
import { ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon } from '@heroicons/react/24/solid'
import type { ConversationItem } from '@/types/app'
import OptionsDropdown from './OptionsDropdown'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export type ISidebarProps = {
  copyRight: string
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
  isResponding?: boolean
  isGeneratingTitle?: boolean
}

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
  isResponding,
  isGeneratingTitle,
}) => {
  const { t } = useTranslation()
  const isDisabled = isResponding || isGeneratingTitle
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const optionIconRef = useRef<HTMLDivElement>(null)

  const handleToggleOptions = () => {
    setIsOptionsOpen(prev => !prev)
  }

  const handleCloseOptions = () => {
    setIsOptionsOpen(false)
  }

  const handleAboutClick = () => {
    console.log('About clicked')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOptionsOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        optionIconRef.current &&
        !optionIconRef.current.contains(event.target as Node)
      ) {
        handleCloseOptions();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOptionsOpen]);

  return (
    <div
      className="shrink-0 flex flex-col overflow-y-hidden bg-gray-100 pc:w-[244px] tablet:w-[192px] mobile:w-[240px] h-screen"
    >
      {/* Top Icons Section */}
      <div className="p-2 flex justify-between items-center">
        <div
          className={`p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
            // Placeholder for sidebar_left action if any, or just an icon
            console.log('Sidebar left icon clicked')
          }}
          title="Toggle Sidebar"
        >
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
            <path d="M141.074286 906.496h741.851428c89.581714 0 134.582857-44.562286 134.582857-132.845714V250.331429c0-88.283429-45.001143-132.845714-134.582857-132.845715H141.074286C51.931429 117.504 6.491429 161.645714 6.491429 250.331429V773.668571c0 88.704 45.44 132.845714 134.582857 132.845715z m1.28-68.992c-42.861714 0-66.852571-22.710857-66.852572-67.291429V253.805714c0-44.580571 23.990857-67.291429 66.852572-67.291428h190.72v651.008z m739.291428-651.008c42.422857 0 66.852571 22.710857 66.852572 67.291429V770.194286c0 44.580571-24.429714 67.291429-66.852572 67.291428h-481.28V186.496z m-630.857143 159.012571c12.854857 0 24.429714-11.574857 24.429715-24.009142 0-12.854857-11.574857-23.990857-24.429715-23.990858h-92.16c-12.836571 0-23.990857 11.136-23.990857 23.990858 0 12.434286 11.154286 24.009143 24.009143 24.009142z m0 110.994286c12.854857 0 24.429714-11.574857 24.429715-24.429714 0-12.854857-11.574857-23.588571-24.429715-23.588572h-92.16c-12.836571 0-23.990857 10.733714-23.990857 23.588572 0 12.854857 11.154286 24.429714 24.009143 24.429714z m0 110.573714c12.854857 0 24.429714-10.715429 24.429715-23.588571 0-12.836571-11.574857-23.990857-24.429715-23.990857h-92.16c-12.836571 0-23.990857 11.154286-23.990857 24.009143s11.154286 23.570286 24.009143 23.570285z"></path>
          </svg>
        </div>
        <div
          className={`p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
            if (!isDisabled) {
              onCurrentIdChange('-1')
            }
          }}
          title={t('app.chat.newChat') || 'New Chat'}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
            <path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path>
          </svg>
        </div>
      </div>

      <nav className="flex-1 space-y-1 bg-gray-100 p-2 overflow-y-auto">
        {list.map((item) => {
          const isCurrent = item.id === currentId
          const ItemIcon
            = isCurrent ? ChatBubbleOvalLeftEllipsisSolidIcon : ChatBubbleOvalLeftEllipsisIcon
          return (
            <div
              onClick={() => {
                if (!isDisabled) {
                  onCurrentIdChange(item.id)
                }
              }}
              key={item.id}
              className={classNames(
                isCurrent
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-700',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              )}
            >
              <ItemIcon
                className={classNames(
                  isCurrent
                    ? 'text-primary-600'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-5 w-5 flex-shrink-0',
                )}
                aria-hidden="true"
              />
              <div
                className="grow overflow-hidden whitespace-nowrap"
                title={item.name}
                style={{ maskImage: 'var(--sidebar-mask)', WebkitMaskImage: 'var(--sidebar-mask)' }
                }>
                {item.name}
              </div>
            </div>
          )
        })}
      </nav>
      {/* <a className="flex flex-shrink-0 p-4" href="https://langgenius.ai/" target="_blank">
        <Card><div className="flex flex-row items-center"><ChatBubbleOvalLeftEllipsisSolidIcon className="text-primary-600 h-6 w-6 mr-2" /><span>LangGenius</span></div></Card>
      </a> */}
      {/* Bottom Icons Section - Relative positioning for dropdown */}
      <div className="relative p-2 flex justify-between items-center">
        <div
          ref={optionIconRef}
          className={`p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
            if (!isDisabled)
              handleToggleOptions()
          }}
          title="Options"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
            <path d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"></path>
          </svg>
        </div>
        <div className="flex items-center pr-1">
          <span className="text-[10px] text-gray-500 mr-1">POWERED BY</span>
          <img src="/logo-site.png" alt="Dify Logo" className="h-4" />
        </div>

        {/* Options Dropdown */}
        {isOptionsOpen && (
          <div ref={dropdownRef} className="absolute bottom-full left-0">
            <OptionsDropdown
              onClose={handleCloseOptions}
              onAboutClick={handleAboutClick}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
