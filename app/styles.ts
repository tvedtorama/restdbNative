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
	newItemRow: <ViewStyle> {
		marginTop: 20,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
	},
	newItemEdit: <ViewStyle> {
		alignSelf: 'stretch',
		width: 170, // No idea why this is needed, otherwise it disappears
	},
	newItemRowButton: <ViewStyle> {
		height: 10,
	},
	main: <ViewStyle> {
		margin: 20,
		flexDirection: 'column',
		alignItems: 'stretch',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
	},
	todoScroll: <ViewStyle> {
		height: 300, // I just want this to occupy ca 80% of the screen surface, could use Dimensions...
	},
	todoRow: <ViewStyle> {
		flex: 1,
		// height: 25,  heigh will be overridden by the animated style
		flexDirection: 'row',
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	todoRowCompleted: <ViewStyle> {
  	},
  	todoRowText: <TextStyle> {
  		maxWidth: 170,
  	},
  	todoRowTextCompleted: <TextStyle> {
		color: '#d9d9d9',
  		textDecorationLine: 'line-through',
  	},
  	todoDeleteButton: <ViewStyle> {

  	},
	footer: <ViewStyle> {
		alignItems: 'center',
	},
	selectButton: <ViewStyle> {
		margin: 3,
	},
	selectedSelectButton: <ViewStyle> {
		backgroundColor: 'orange',
	},

})
