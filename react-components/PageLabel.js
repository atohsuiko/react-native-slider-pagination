'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export default class PageLabel extends Component {
    static propTypes = {
      value: PropTypes.number.isRequired,
      disabled: PropTypes.bool,
      bold: PropTypes.bool,
      selectedStyle: PropTypes.object,
      unselectedStyle: PropTypes.object
    };

    render() {
        var pageLabel;
        const {
            value,
            disabled,
            bold,
            selectedStyle,
            unselectedStyle
        } = this.props;
        if (disabled) {
            pageLabel = <></>;
        } else {
            if (bold) {
                pageLabel =   <Text style={selectedStyle}>
                               {"Page " + (value+1)}
                            </Text>
            } else {
                pageLabel =   <Text style={unselectedStyle}>
                                {"Page " + (value+1)}
                            </Text>
            }
        }

        return (
            pageLabel
        );
    }
  }