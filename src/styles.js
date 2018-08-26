import { Dimensions} from 'react-native';
import colors from './colors.js';

export default {
	container: {
	    flex: 1,
	    backgroundColor: '#FFF',
        flexDirection: 'column',
        height:"100%"
    },
    itemList: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    itemListIntern: {
        flexDirection: 'column',
        padding: 15
    },
    itemListArrow: {
        position:'absolute',
        right:15,
        top:18
    },
    itemListArrowText:{
        textAlign:'left',
        color:colors.black,
        fontSize: 16
    },
    shadowTop: {
	    shadowColor: '#000000',
	    shadowOffset: {
	    	width: 0,
	    	height: -5
	    },
	    shadowRadius: 5,
	    shadowOpacity: 0.1
    },
	tabBar: {
	    backgroundColor: '#FFF'
    },
    title: {
        fontWeight: 'bold',
        color: colors.dark,
        padding: 10,
        paddingTop:15,
        fontSize: 20,
        textAlign: 'center'
    },
    subtitle: {
        color: colors.black,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center'
    },
    imageCandidato: {
        width:"90%",
        height:150,
        margin: 15,
        borderRadius: 10,
    },
    imageViceCandidato: {
        width:50,
        height:100,
        borderRadius: 10,
    },
    titleSection: {
        fontWeight: 'bold',
        color: colors.dark,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 15,
    },
}