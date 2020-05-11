/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {WebView} from 'react-native-webview';
import {BackHandler, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  hideSplashScreen = () => {
    SplashScreen.hide();
  };

  webView = {
    canGoBack: false,
    ref: null,
  };
  /** For Loading And Back Button Press**/
  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.webView.ref.reload();
    this.setState({refreshing: false});
  };
  render() {
    return (
      <WebView
        ref={webView => {
          this.webView.ref = webView;
        }}
        onNavigationStateChange={navState => {
          this.webView.canGoBack = navState.canGoBack;
        }}
        source={{uri: 'https://my-heroes-app.herokuapp.com'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        onLoad={() => this.hideSplashScreen()}
        thirdPartyCookiesEnabled={true}
      />
    );
  }
}

export default App;
