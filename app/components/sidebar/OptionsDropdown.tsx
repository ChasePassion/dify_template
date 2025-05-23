import React, { useState } from 'react';

interface OptionsDropdownProps {
    onClose: () => void;
    onAboutClick: () => void;
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({ onClose, onAboutClick }) => {
    const [selectedTheme, setSelectedTheme] = useState<'system' | 'light' | 'dark'>('system');

    const handleThemeChange = (theme: 'system' | 'light' | 'dark') => {
        setSelectedTheme(theme);
        // 在这里可以添加实际的主题切换逻辑
        console.log('Theme changed to:', theme);
    };

    const ThemeIcon = () => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="remixicon h-4 w-4">
            <path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path>
        </svg>
    );

    const LightThemeIcon = () => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="remixicon h-4 w-4">
            <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
        </svg>
    );

    const DarkThemeIcon = () => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="remixicon h-4 w-4">
            <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"></path>
        </svg>
    );

    return (
        <div className="w-[224px] rounded-xl border-[0.5px] border-gray-300 bg-white shadow-lg backdrop-blur-sm">
            {/* 主题选择部分 */}
            <div className="p-1">
                <div className="text-sm flex cursor-pointer items-center rounded-lg py-1.5 pl-3 pr-2 text-gray-600">
                    <div className="grow">主题</div>
                    <div className="flex items-center rounded-[10px] bg-gray-200 p-0.5">
                        {/* 系统默认图标 */}
                        <div
                            onClick={() => handleThemeChange('system')}
                            className={`rounded-lg px-2 py-1 cursor-pointer ${selectedTheme === 'system'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-300 hover:text-gray-700'
                                }`}
                        >
                            <div className="p-0.5"><ThemeIcon /></div>
                        </div>

                        {/* 间隔线（透明） */}
                        <div className="h-[14px] w-px bg-transparent"></div>

                        {/* 亮色主题图标 */}
                        <div
                            onClick={() => handleThemeChange('light')}
                            className={`rounded-lg px-2 py-1 cursor-pointer ${selectedTheme === 'light'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-300 hover:text-gray-700'
                                }`}
                        >
                            <div className="p-0.5"><LightThemeIcon /></div>
                        </div>

                        {/* 间隔线 */}
                        <div className="h-[14px] w-px bg-gray-300"></div>

                        {/* 暗色主题图标 */}
                        <div
                            onClick={() => handleThemeChange('dark')}
                            className={`rounded-lg px-2 py-1 cursor-pointer ${selectedTheme === 'dark'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:bg-gray-300 hover:text-gray-700'
                                }`}
                        >
                            <div className="p-0.5"><DarkThemeIcon /></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 分隔线 */}
            <div className="w-full h-[0.5px] bg-gray-300 my-0"></div>

            {/* 关于 */}
            <div className="p-1">
                <div
                    onClick={() => {
                        onAboutClick();
                        onClose(); // Close dropdown after clicking "About"
                    }}
                    className="text-sm cursor-pointer rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                >
                    关于
                </div>
            </div>
        </div>
    );
};

export default OptionsDropdown; 