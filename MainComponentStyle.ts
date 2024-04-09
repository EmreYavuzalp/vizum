import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      padding: 12
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    deleteContainer: {
      opacity: 0.85,
      borderRadius: 5,
      marginVertical: 8, // Spacing between cards
    },
    card: {
      borderRadius: 5,
      padding: 10,
      justifyContent: 'space-between',
      flex: 1,
    },
    timeIndicator: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: '#00000070',
      borderRadius: 10,
      padding: 5,
    },
    timeIndicatorText: {
      color: '#FFFFFF',
      fontSize: 12,
    },
    itemContainer: {
      margin: 0,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
        height: 2,
        width: 0
      },
      elevation: 3,
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      justifyContent: 'center'
    },
    itemContainerPattern: {
      position: 'absolute', 
      top: 0, 
      bottom: 0, 
      left: 0, 
      right: 0, 
      backgroundColor: '#000000', 
      opacity: 0.5, 
      transform: [{ rotate: '45deg' }], 
      width: "auto", 
      zIndex: 2 
    },
    swiperContainer: { 
      margin: 4,
      borderRadius: 8, 
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    textStyle: {
      fontSize: 40, 
      textAlign: 'center', 
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      zIndex: 3,
      height: 80
    },
    masonryListStyle: {
      backgroundColor: 'transparent', 
      margin: 2
    }
});
