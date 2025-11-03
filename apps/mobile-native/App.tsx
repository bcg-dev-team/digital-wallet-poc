import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  // 개발 환경에서는 로컬 서버 URL, 프로덕션에서는 빌드된 파일 경로
  const webViewUrl = __DEV__
    ? 'http://192.168.50.187:5173' // mobile 앱 개발 서버 (실제 IP 주소 사용)
    : 'file:///android_asset/mobile-app/index.html'; // 빌드된 파일

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  const handleGoBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward && webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('WebView message:', data);

      // Vue 앱에서 보낸 메시지 처리
      if (data.type === 'navigate') {
        // 네비게이션 처리
        Alert.alert('Navigation', `Navigate to: ${data.route}`);
      }
    } catch (error) {
      console.log('WebView message (raw):', event.nativeEvent.data);
    }
  };

  const injectedJavaScript = `
    // Vue 앱과 React Native 간 통신을 위한 스크립트
    window.ReactNative = {
      postMessage: function(data) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    };

    // Vue 앱이 로드된 후 초기화
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Vue app loaded in WebView');
      
      // Vue 앱에 React Native 환경임을 알림
      window.ReactNative.postMessage({
        type: 'appReady',
        platform: '${Platform.OS}'
      });
    });

    // 라우터 변경 감지
    if (window.history && window.history.pushState) {
      const originalPushState = window.history.pushState;
      window.history.pushState = function() {
        originalPushState.apply(this, arguments);
        window.ReactNative.postMessage({
          type: 'routeChange',
          url: window.location.href
        });
      };
    }

    true; // 필수 반환값
  `;

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="auto" />

      {/* 네비게이션 바 */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
          onPress={handleGoBack}
          disabled={!canGoBack}
        >
          <Text style={[styles.navButtonText, !canGoBack && styles.navButtonTextDisabled]}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !canGoForward && styles.navButtonDisabled]}
          onPress={handleGoForward}
          disabled={!canGoForward}
        >
          <Text style={[styles.navButtonText, !canGoForward && styles.navButtonTextDisabled]}>
            →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleRefresh}>
          <Text style={styles.navButtonText}>🔄</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <Text style={styles.title}>Vue3 Mobile App</Text>
      </View>

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: webViewUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        // 개발 환경에서 로컬 서버 접근 허용
        originWhitelist={['*']}
        // 개발 환경에서 인증서 오류 무시
        onShouldStartLoadWithRequest={(request) => {
          return true;
        }}
        // 에러 처리
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error:', nativeEvent);
          Alert.alert(
            '로딩 오류',
            '앱을 로드하는 중 오류가 발생했습니다. 개발 서버가 실행 중인지 확인해주세요.',
            [
              { text: '다시 시도', onPress: handleRefresh },
              { text: '취소', style: 'cancel' },
            ]
          );
        }}
      />

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        paddingTop: 8,
      },
    }),
  },
  navButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    minWidth: 40,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#f8f8f8',
  },
  navButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  navButtonTextDisabled: {
    color: '#999999',
  },
  spacer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
});
