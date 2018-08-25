import { Dimensions} from 'react-native';
import colors from './colors.js';

export default {
	container: {
	    flex: 1,
	    backgroundColor: '#FFF',
	    flexDirection: 'column'
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
    }
}