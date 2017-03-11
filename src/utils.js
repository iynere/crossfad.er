export const isUnstarted = video => video.getPlayerState() === -1

export const isPlaying = video => video.getPlayerState() === 1

export const isPaused = video => video.getPlayerState() === 2

export const hasEnded = video => video.getPlayerState() === 0

export const isLoading = video => video.getPlayerState() === 3

export const isReady = video => video.getPlayerState() === 5