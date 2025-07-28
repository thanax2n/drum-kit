function removeTransition(e) {
  if (e.propertyName !== "transform") return
  e.target.classList.remove("playing")
}

function playSoundByKeyCode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`)
  const key = document.querySelector(`.key[data-key="${keyCode}"]`)
  if (!audio) return
  key.classList.add("playing")
  audio.currentTime = 0
  audio.play()
}

// สำหรับ keypress บน desktop
function playSoundOnKeydown(e) {
  playSoundByKeyCode(e.keyCode)
}

// สำหรับ tap/click บนมือถือ-เดสก์ท็อป
function playSoundOnPointer(e) {
  // ป้องกันเหตุการณ์ซ้ํา (touchstart → click)
  e.preventDefault()
  const keyCode = this.getAttribute("data-key")
  playSoundByKeyCode(keyCode)
}

const keys = Array.from(document.querySelectorAll(".key"))
keys.forEach((key) => {
  // transitionend เหมือนเดิม
  key.addEventListener("transitionend", removeTransition)

  // desktop keyboard
  window.addEventListener("keydown", playSoundOnKeydown)

  // แตะหรือคลิกบน .key แต่ละตัว
  key.addEventListener("click", playSoundOnPointer)
  key.addEventListener("touchstart", playSoundOnPointer, { passive: false })
})
