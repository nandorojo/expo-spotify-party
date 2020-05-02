import React, {
  useRef,
  useMemo,
  useCallback,
  useEffect,
  RefObject,
} from 'react'
import styled from 'styled-components/native'
import {
  useValue,
  mix,
  between,
  useTimingTransition,
  string,
} from 'react-native-redash'
import { Dimensions, Platform } from 'react-native'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import { useSafeArea } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ThemeProps, ThemeUi } from '../theme'
import { BlurView } from 'expo-blur'
import { Entypo } from '@expo/vector-icons'
import { A } from '@expo/html-elements'
import { Linking } from 'expo'
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const HorizontalPadding = ThemeUi.spacing[1]

const Container = styled.View`
  flex: 1;
  background-color: yellow;
  position: relative;
`

const HeaderContainer = styled.View`
  background-color: ${({ theme }: ThemeProps) => theme.colors.muted};
`

const ArtworkContainer = styled.View`
  position: absolute;
  z-index: 1000;
`
const Artwork = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }: ThemeProps) => theme.radii[2]}px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background};
`

const HeaderContent = styled.View`
  margin-left: ${({ marginLeft }: { marginLeft: number } & ThemeProps) =>
    marginLeft}px;
  margin-right: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const HeaderSongContainer = styled.View`
  flex-grow: 1;
`

const HeaderSongTitle = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-weight: ${({ theme }: ThemeProps) => theme.fontWeights.bold};
  /* font-size: ${({ theme }: ThemeProps) => theme.fontSizes[0]}px; */
  /* padding-top: ${({ theme }: ThemeProps) => theme.spacing[1]}px; */
`

const HeaderSongArtist = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.primary};
  /* font-size: ${({ theme }: ThemeProps) => theme.fontSizes[0]}px; */
`

const HeaderDeviceName = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text}80;
`

const HeaderSongDevice = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  /* font-size: ${({ theme }: ThemeProps) => theme.fontSizes[0]}px; */
`

const OpenContentContainer = styled.View`
  padding: ${HorizontalPadding}px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.muted};
  /* position: absolute; */
`

const OpenContent = styled.View`
  padding-top: ${({ theme }: ThemeProps) => theme.spacing[1]}px;
`

const BigSongTitle = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
  text-align: center;
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  margin-bottom: ${({ theme }: ThemeProps) => theme.spacing[1]}px;
  padding-top: ${({ theme }: ThemeProps) => theme.spacing[1]}px;
`
const BigSongArtist = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
  text-align: center;
  color: ${({ theme }: ThemeProps) => theme.colors.secondary};
`

const Overlay = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }: ThemeProps) => theme.colors.text};
`

const SmallControls = styled.View`
  flex-direction: row;
  align-items: center;
`

const TrackTimeBar = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: ${({ theme }: ThemeProps) => theme.spacing[1] / 2}px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.text}30;
  border-radius: ${({ theme }: ThemeProps) => theme.radii[2]}px;
  overflow: hidden;
`

const TrackTimeBarOverlay = styled.View`
  height: 100%;
  background-color: ${({ theme }: ThemeProps) => theme.colors.text};
  border-radius: ${({ theme }: ThemeProps) => theme.radii[2]}px;
`

type Props = {
  title: string
  artist: string
  // album: string
  artworkUrl: string
  duration_ms: number
  progress_ms: number
  track_uri: string
  device_name?: string
}

type Scalar = 'ArtworkSize'

type Size = { [key in Scalar]: number }

export default React.forwardRef<BottomSheet, Props>(function Sheet(
  props: Props,
  ref
) {
  const {
    artworkUrl = 'https://images-na.ssl-images-amazon.com/images/I/71TRfYUtDLL._SL1500_.jpg',
    title = 'Started From The Bottom',
    artist = 'Drake',
    duration_ms = 30000,
    progress_ms = 15000,
    device_name,
    track_uri,
  } = props

  const animatedSwipe = useValue<number>(Platform.OS === 'web' ? 1 : 0) // 0 = open, 1 = closed
  const animatedInterpolate = useCallback(
    // i forget what # means open / closed, so this is a nice convenience function
    ({ open, closed }: { open: number; closed: number }) =>
      mix(animatedSwipe, open, closed),
    [animatedSwipe]
  )
  const sheetRef = useRef<BottomSheet>(null)
  useEffect(() => {
    // @ts-ignore
    if (ref) ref.current = sheetRef.current
  })

  const trackTimeBarWidth = useTimingTransition(progress_ms / duration_ms)

  const { bottom = 0 } = useSafeArea()

  const ArtworkPadding = useMemo(
    () => [HorizontalPadding, HorizontalPadding * 2],
    []
  )

  const ArtworkSize = useMemo(
    () => [
      // at least 40, at most 70, responsive
      Math.max(40, Math.min(70, Dimensions.get('window').width / 7)),
      Dimensions.get('window').width - ArtworkPadding[1] * 2,
    ],
    [ArtworkPadding]
  )

  const HeaderHeight = useMemo(
    () => [
      ArtworkSize[0] + HorizontalPadding + (bottom || HorizontalPadding),
      // 0,
    ],
    [ArtworkSize, bottom]
  )

  const SnapPoints = useMemo(
    () => [
      HeaderHeight[0],
      Platform.select({
        // web: HeaderHeight[0],
        default: Dimensions.get('window').height - 200,
      }),
    ],
    [HeaderHeight]
  )

  const openSongOnSpotify = useCallback(
    async () =>
      track_uri &&
      (await Linking.canOpenURL(track_uri)) &&
      Linking.openURL(track_uri),
    [track_uri]
  )

  const renderArtwork = useCallback(() => {
    const size = animatedInterpolate({
      open: ArtworkSize[1],
      closed: ArtworkSize[0],
    })
    const padding = animatedInterpolate({
      open: ArtworkPadding[1],
      closed: ArtworkPadding[0],
    })
    return (
      <ArtworkContainer
        key="artwork-container"
        as={Animated.View}
        style={{
          height: size,
          width: size,
          top: padding,
          left: padding,
          shadowColor: ThemeUi.colors.background,
          shadowOffset: {
            width: 0,
            height: 15,
          },
          shadowOpacity: 0.25,
          shadowRadius: 15.0,
        }}
      >
        <TouchableWithoutFeedback
          key="artwork-touchable"
          onPress={() => sheetRef.current?.snapTo(1)}
          containerStyle={{ height: '100%' }}
          style={{ height: '100%' }}
        >
          <Artwork
            key="artwork-image"
            source={{ uri: artworkUrl }}
            style={{ flex: 1 }}
          />
        </TouchableWithoutFeedback>
        <TrackTimeBar
          key="track-time-bar"
          as={Animated.View}
          style={{ height: animatedInterpolate({ open: 6, closed: 3 }) }}
        >
          <TrackTimeBarOverlay
            key="track-time-bar-overlay"
            as={Animated.View}
            style={{
              width: string`${Animated.multiply(trackTimeBarWidth, 100)}%`,
            }}
          />
        </TrackTimeBar>
      </ArtworkContainer>
    )
  }, [
    ArtworkPadding,
    ArtworkSize,
    animatedInterpolate,
    artworkUrl,
    trackTimeBarWidth,
  ])

  const renderHeader = useCallback(() => {
    console.log('[render-header] rendering')
    return [
      <HeaderContainer
        // as={Animated.View}
        key="header-container"
        style={{
          height: HeaderHeight[0],
        }}
      >
        <HeaderContent
          marginLeft={ArtworkSize[0] + HorizontalPadding * 2}
          key="header-content"
          as={Animated.View}
          style={{
            height: ArtworkSize[0],
            marginTop: ArtworkPadding[0],
            opacity:
              Platform.OS !== 'web'
                ? Animated.interpolate(animatedSwipe, {
                    inputRange: [0, 0.8, 1],
                    outputRange: [0, 0, 1],
                  })
                : undefined,
          }}
        >
          <TouchableWithoutFeedback
            key="header-song-touchable"
            onPress={() => sheetRef.current?.snapTo(1)}
          >
            <HeaderSongContainer key="header-song-container">
              <HeaderSongTitle
                key="header-song-title"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </HeaderSongTitle>
              <HeaderSongArtist key="header-song-artist">
                {artist}
              </HeaderSongArtist>
              {!!device_name && (
                <HeaderDeviceName>{device_name}</HeaderDeviceName>
              )}
            </HeaderSongContainer>
          </TouchableWithoutFeedback>
          <SmallControls
            key="small-controls"
            as={Animated.View}
            style={{
              transform: [
                { translateX: animatedInterpolate({ open: 100, closed: 0 }) },
              ],
            }}
            // pointerEvents="none"
          >
            <TouchableWithoutFeedback onPress={openSongOnSpotify}>
              <Entypo
                key="entypo-small-spotify"
                name="spotify"
                color={ThemeUi.colors.text}
                size={30}
                // style={{ paddingRight: ThemeUi.spacing[3] }}
                // onPress={() => alert('spotify')}
              />
            </TouchableWithoutFeedback>
            {/*<Ionicons
                name="md-skip-forward"
                color={ThemeUi.colors.text}
                size={30}
                onPress={() => alert('skip')}
              />*/}
          </SmallControls>
        </HeaderContent>
        {Platform.OS === 'web' && renderArtwork()}
      </HeaderContainer>,
      Platform.OS !== 'web' && renderArtwork(),
    ]
  }, [
    ArtworkPadding,
    ArtworkSize,
    HeaderHeight,
    animatedInterpolate,
    animatedSwipe,
    artist,
    device_name,
    openSongOnSpotify,
    renderArtwork,
    title,
  ])

  const renderContent = useCallback(() => {
    // if (Platform.OS === 'web') return <View />
    return (
      <OpenContentContainer
        as={Animated.View}
        style={{
          height: SnapPoints[1] - HeaderHeight[0],
          // flex: 1,
        }}
        key="open-content-container"
      >
        <OpenContent
          key="open-content"
          as={Animated.View}
          style={{
            // offset the site of the artwork when it's open
            marginTop: ArtworkSize[1] - HeaderHeight[0] + HorizontalPadding,
            // opacity: Animated.interpolate(animatedSwipe, {
            //   inputRange: [0, 0.2, 1],
            //   outputRange: [1, 0, 0],
            // }),
          }}
        >
          <BigSongTitle>{title}</BigSongTitle>
          <BigSongArtist>{artist}</BigSongArtist>
        </OpenContent>
      </OpenContentContainer>
    )
  }, [ArtworkSize, HeaderHeight, SnapPoints, artist, title])

  const renderOverlay = useCallback(() => {
    if (Platform.OS === 'web') return null
    return (
      <Overlay
        style={{ opacity: animatedInterpolate({ open: 0.4, closed: 0 }) }}
        as={Animated.View}
        pointerEvents={
          between(animatedSwipe, 0, 0.99, true) ? 'none' : undefined
        }
        // onTouchStart={() => sheetRef.current?.snapTo(1)}
      />
    )
  }, [animatedInterpolate, animatedSwipe])

  return Platform.OS === 'web' ? (
    <>{renderHeader()}</>
  ) : (
    <>
      <BottomSheet
        ref={sheetRef}
        initialSnap={0}
        callbackNode={animatedSwipe}
        snapPoints={SnapPoints}
        renderHeader={renderHeader}
        renderContent={renderContent}
        enabledBottomInitialAnimation
      />
      {renderOverlay()}
    </>
  )
})
