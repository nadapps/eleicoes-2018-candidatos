import { Dimensions} from 'react-native';
import colors from './colors.js';

export default {
	container: {
	    flex: 1,
	    backgroundColor: '#FFF',
        flexDirection: 'column',
        height:"100%",
        backgroundColor: colors.accent
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
	    backgroundColor: '#F5F4F4'
    },
    title: {
        fontWeight: 'bold',
        color: colors.grey,
        padding: 10,
        paddingTop:15,
        fontSize: 20,
        textAlign: 'center'
    },
    titleMeuCandidato: {
        fontWeight: 'bold',
        color: colors.grey,
        paddingBottom: 8,
        fontSize: 16,
        textAlign: 'center'
    },
    subtitle: {
        color: colors.black,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center'
    },
    imageCandidato: {
        width:100,
        height:150,
        justifyContent:'flex-end',
        marginRight:15,
        borderColor: colors.greyNew,
        borderWidth: 5,
        backgroundColor: "white"
    },
    imagePartido: {
        width:100,
        height:100,
        marginLeft:15,
        resizeMode:'contain',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderColor: colors.greyNew,
        borderWidth: 5,
        marginTop: 30,
        backgroundColor: "white"
    },
    imageViceCandidato: {
        width:"80%",
        height:90,
        margin: 15,
        borderRadius: 10,
    },
    titleVice: {
        fontWeight: 'bold',
        color: colors.grey,
        padding: 5,
        fontSize: 18,
        textAlign: 'center',
        marginTop:20
    },
    titleSection: {
        fontWeight: 'bold',
        color: colors.grey,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 15,
        textAlign: 'center'
    },
    card: {
        padding:0,
        marginBottom:10,
        borderRadius:15
    },
    list: {
        marginTop:0,
        borderTopWidth:0
    },
    line: {
        borderBottomColor:colors.greyLight,
        borderBottomWidth:1,
        flex:1,
        flexDirection:'row',
        marginLeft:'10%',
        marginRight:'10%',
        marginTop:20,
        marginBottom:15
    }
}