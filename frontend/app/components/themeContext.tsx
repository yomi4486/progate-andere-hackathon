import { createContext, useContext, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme, Theme } from '../theme'

const ThemeContext = createContext<Theme>(lightTheme)

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? darkTheme : lightTheme

	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	)
}

export const useTheme = (): Theme => {
	const theme = useContext(ThemeContext)
	if (!theme) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return theme
}
