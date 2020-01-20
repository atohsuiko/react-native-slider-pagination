'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import PageLabel from './PageLabel';

export default class SliderPaginationView extends Component {

    static propTypes = {
        pageCount: PropTypes.number.isRequired,
        previousLabel: PropTypes.node,
        nextLabel: PropTypes.node,
        onPageChange: PropTypes.func,
        initialPage: PropTypes.number,
        disableInitialCallback: PropTypes.bool,
        containerClassName: PropTypes.string,
        previousClassName: PropTypes.string,
        nextClassName: PropTypes.string,
        previousLinkClassName: PropTypes.string,
        nextLinkClassName: PropTypes.string,
        sliderClassName: PropTypes.string,
        disabledPageLabel: PropTypes.bool,
        sliderStyle: PropTypes.object,
        pageLabelSelectedStyle: PropTypes.object,
        pageLabelUnselectedStyle: PropTypes.object,
        minimumTrackTintColor: PropTypes.string,
        maximumTrackTintColor: PropTypes.string,
        thumbTintColor: PropTypes.string
      };
    
    static defaultProps = {
        containerClassName: 'container',
        pageCount: 10,
        previousClassName: 'previous',
        nextClassName: 'next',
        previousLabel: <Text style={{color: "grey"}}> Previous </Text>,
        nextLabel: <Text style={{color: "grey"}}> Next </Text>,
        disableInitialCallback: false,
        disablesPageLabel: false,
        sliderStyle: {width: 200, height: 40},
        pageLabelSelectedStyle: {fontWeight:'bold'},
        pageLabelUnselectedStyle: {color: 'black'},
        minimumTrackTintColor: "#C0C0C0",
        maximumTrackTintColor: "#C0C0C0",
        thumbTintColor: "#C0C0C0"
    };

    constructor(props) {
        super(props);

        let initialSelected;
        if (props.initialPage) {
            initialSelected = props.initialPage-1;
        } else {
            initialSelected = 0;
        }

        this.state = {
            selected: initialSelected,
            sliderIndex: initialSelected,
            previousSliderIndex: initialSelected
        };
    }

    componentDidMount() {
        const {
            initialPage,
            disableInitialCallback,
        } = this.props;
        // Call the callback with the initialPage item:
        if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
            this.callCallback(initialPage);
        }
    }

    handlePreviousPage = evt => {
        const { selected } = this.state;
        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
        if (selected > 0) {
            this.handlePageSelected(selected - 1, evt);
        }
    };

    handleNextPage = evt => {
        const { selected } = this.state;
        const { pageCount } = this.props;

        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
        if (selected < pageCount - 1) {
            this.handlePageSelected(selected + 1, evt);
        }
    };

    handleSliderSelected = (value) => {
        const sliderValue = Math.round(value);
        this.handlePageSelected(sliderValue, null);
    }

    handlePageSelected = (selected, evt) => {
        if (evt) {
            evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
        }

        if (this.state.selected === selected) return;

        this.setState({ selected: selected, sliderIndex: selected, previousSliderIndex: selected });

        // Call the callback with the new selected page:
        this.callCallback(selected + 1);
    };

    sliderChanged = (value) => {
        const sliderValue = Math.round(value);
        const { previousSliderIndex } = this.state;
        if (sliderValue != previousSliderIndex) {
            this.setState({sliderIndex: sliderValue, previousSliderIndex: sliderValue});
        }
    }

    callCallback = selectedItem => {
    if (
        typeof this.props.onPageChange !== 'undefined' &&
        typeof this.props.onPageChange === 'function'
    ) {
        this.props.onPageChange(selectedItem);
    }
    };

    render() {
        const {
            previousClassName,
            nextClassName,
            pageCount,
            containerClassName,
            previousLinkClassName,
            previousLabel,
            nextLinkClassName,
            nextLabel,
            sliderClassName,
            sliderStyle,
            pageLabelSelectedStyle,
            pageLabelUnselectedStyle,
            disabledPageLabel,
            minimumTrackTintColor,
            maximumTrackTintColor,
            thumbTintColor
          } = this.props;
      
          const { selected } = this.state;

          const { sliderIndex } = this.state;
          const isBold = sliderIndex == selected ? true : false;
          return (
            <View className={containerClassName}>
                <View style={{alignItems: "center"}}>
                    <PageLabel
                        value={sliderIndex}
                        bold={isBold}
                        disabled={disabledPageLabel}
                        selectedStyle={pageLabelSelectedStyle}
                        unselectedStyle={pageLabelUnselectedStyle}>
                    </PageLabel>
                </View>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <View
                    className={previousClassName}
                    style={{justifyContent: "center"}}
                    >
                        <TouchableOpacity
                            className={previousLinkClassName}
                            onPress={this.handlePreviousPage}>
                        {previousLabel}
                        </TouchableOpacity>
                    </View>

                    <Slider
                        className={sliderClassName}
                        style={sliderStyle}
                        minimumValue={0}
                        maximumValue={pageCount-1}
                        onSlidingComplete={this.handleSliderSelected.bind(this)}
                        onValueChange={this.sliderChanged.bind(this)}
                        value={selected}
                        minimumTrackTintColor={minimumTrackTintColor}
                        maximumTrackTintColor={maximumTrackTintColor}
                        thumbTintColor={thumbTintColor}
                        ref="MySlider"
                    />

                    <View 
                    className={nextClassName}
                    style={{justifyContent: "center"}}
                    >
                        <TouchableOpacity
                            className={nextLinkClassName}
                            onPress={this.handleNextPage}>
                        {nextLabel}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          );
    }
}