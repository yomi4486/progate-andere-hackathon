import AsyncStorage from '@react-native-async-storage/async-storage'

type History = Record<string, any>

/**
 * 通話履歴を取得する関数です
 * @returns 全ての通話履歴をJSONで返します
 */
export async function getHistory(): Promise<History | null> {
	try {
		const valueString = await AsyncStorage.getItem('call_history')
		if (valueString) {
			const value: History = JSON.parse(valueString)
			return value
		} else {
			throw new Error('failed parse')
		}
	} catch (err) {
		console.error(err)
	}
	return null
}

/**
 * 通話情報を履歴に追加する関数です。すでにある内容に追記する感じ。
 * @param value - 通話の詳細：通話を誰から開始したか、何分通話したか、いつの通話か、ユーザー情報等
 * @param id - 通話の識別を行うためにユニークなIDを指定してください
 */
export async function storeHistory(value: History, id: string) {
	try {
		let baseHistory = await getHistory()
		if (!baseHistory) {
			baseHistory = {}
		}
		baseHistory[id] = value
		await AsyncStorage.setItem('call_history', JSON.stringify(baseHistory))
	} catch (err) {
		console.error(err)
	}
}

/**
 * 通話履歴を全て削除します
 */
export async function initHistory() {
	try {
		await AsyncStorage.setItem('call_history', '{}')
	} catch (err) {
		console.error(err)
	}
	return null
}
