export type Theme = {
	background: string
	text: string
	cardBackground: string
	primary: string
	secondary: string
	border: string
	inputBackground: string
	statusActive: string
	statusInactive: string
	iconDefault: string
	searchIcon: string
	tabActive: string
	tabInactive: string
	tabLineActive: string
	tabLineInactive: string
}

// テーマの定義
export const lightTheme: Theme = {
	background: '#FFFFFF',
	text: '#000000',
	cardBackground: '#EEEEEE',
	primary: '#4CAF50',
	secondary: '#808080',
	border: '#CCCCCC',
	inputBackground: '#EEEEEE',
	statusActive: '#4CAF50',
	statusInactive: '#333333',
	iconDefault: '#CCCCCC',
	searchIcon: '#A0A0A0',
	tabActive: '#4CAF50',
	tabInactive: '#808080',
	tabLineActive: '#4CAF50',
	tabLineInactive: '#808080',
}

export const darkTheme: Theme = {
	background: '#121212',
	text: '#FFFFFF',
	cardBackground: 'red',
	primary: '#4CAF50',
	secondary: '#A0A0A0',
	border: '#333333',
	inputBackground: '#2C2C2C',
	statusActive: '#4CAF50',
	statusInactive: '#666666',
	iconDefault: '#333333',
	searchIcon: '#808080',
	tabActive: '#4CAF50',
	tabInactive: '#808080',
	tabLineActive: '#4CAF50',
	tabLineInactive: '#333333',
}
