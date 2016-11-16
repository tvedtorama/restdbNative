import {StyleSheet, FlexAlignType, FlexJustifyType, ViewStyle, TextStyle, ImageStyle} from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: <FlexJustifyType>'center',
		alignItems: <FlexAlignType>'center',
		backgroundColor: '#F5FCFF',
	},
	info: <ViewStyle | TextStyle | ImageStyle>{
		textAlign: 'center',
		marginBottom: 5,
	},
	welcome: <ViewStyle | TextStyle | ImageStyle>{
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: <ViewStyle | TextStyle | ImageStyle>{
		textAlign: "center",
		color: '#333333',
		marginBottom: 5,
	},
})
