const ipv4Regex =
  /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/

const ipv6Regex = /\b(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\b/i

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.RTCPeerConnection =
  window.RTCPeerConnection ||
  window.mozRTCPeerConnection ||
  window.webkitRTCPeerConnection

const publicIPs = (timeout = 1000) => {
  const ipSet = new Set()

  const onicecandidate = (ice: RTCPeerConnectionIceEvent) => {
    const candidate = ice?.candidate?.candidate

    if (candidate) {
      for (const regex of [ipv4Regex, ipv6Regex]) {
        const [ip] = candidate.match(regex) ?? []
        ip && ipSet.add(ip)
      }
    }
  }

  return new Promise((resolve, reject) => {
    const conn = new globalThis.RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    })
    conn.addEventListener('icecandidate', onicecandidate)
    conn.createDataChannel('')
    conn.createOffer().then(offer => conn.setLocalDescription(offer), reject)

    setTimeout(() => {
      try {
        conn.removeEventListener('icecandidate', onicecandidate)
        conn.close()
      } catch {
        // ignore
      }

      resolve([...ipSet])
    }, timeout)
  })
}

publicIPs().then(console.log)
