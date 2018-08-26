import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Loading from './Loading';

import styles from '../styles';
import colors from '../colors';

class Content extends React.Component {
	constructor(props) {
	    super(props);
	}

	changeTextSearch = (text) => {
		if (this.props.onChangeTextSearch) 
			this.props.onChangeTextSearch(text.toLowerCase());
	}

	clearTextSearch = (text) => {
		this.props.onChangeTextSearch('');
	}
	
	render() {
		return (
		  	<View style={!this.props.style ? styles.container : [styles.container,this.props.style]}>
			  	<StatusBar backgroundColor={colors.dark} barStyle="light-content"/>
				<Loading loading={this.props.loading} />
			  	{
			  		this.props.search && (
			        	<SearchBar
				        	lightTheme
				        	placeholderTextColor='white'
				        	containerStyle={{backgroundColor:colors.primary, marginTop: -10}}
				        	inputStyle={{backgroundColor:colors.dark, color:'white'}}
							onChangeText={this.changeTextSearch}
							onClear={this.clearTextSearch}
							platform="android"
							clearIcon={{color:'white'}}
							icon={{color:'white'}}
				       		placeholder='Pesquisar...' />
			       	)
				}
				<ScrollView>
					{this.props.children}
				</ScrollView>
		  	</View>
		);
    }
};

Content.propTypes = {
	search: PropTypes.bool,
	scroll: PropTypes.bool,
	onChangeTextSearch: PropTypes.func,
	loading: PropTypes.bool
}

Content.defaultProps = {
	search: false,
	loading: false
}

export default Content;