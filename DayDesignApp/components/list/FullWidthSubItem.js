import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

/*
  Author: Andrew Grewell <andrew.grewell@provatahealth.com>
  Link: https://github.com/ProvataHealth/react-native-smooth-swipe-list
*/


const FullWidthSubItem = ({ style, children }) => (
    <View style={[styles.container, style]}>
        {children}
    </View>
);

FullWidthSubItem.propTypes = { style: ViewPropTypes.style };

FullWidthSubItem.displayName = "FullWidthSubItem";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});


export default FullWidthSubItem;
