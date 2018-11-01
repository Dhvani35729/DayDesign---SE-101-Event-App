import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { FullWidthSubItem } from '../../../components';

/*
  Author: Andrew Grewell <andrew.grewell@provatahealth.com>
  Link: https://github.com/ProvataHealth/react-native-smooth-swipe-list
*/


const TodoSubItem = createReactClass({

    onItemPress() {
        console.log('item pressed');
    },

    render() {
        return (
            <FullWidthSubItem style={styles.container}>

            </FullWidthSubItem>
        );
    },

    renderItems() {
        return ['Step One', 'Step Two', 'Step Three'].map((item) => {
            return (
                <TouchableOpacity key={item} onPress={() => this.onItemPress(item)}>
                    <View style={styles.item}>
                        <Text>
                            {item}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });
    }
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TodoSubItem;
