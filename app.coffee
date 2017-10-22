# Módulos

StatusBarLayer = require "statusbarlayer/StatusBarLayer"
CameraInput = require "framer-camera-input/CameraInput"
InputModule = require "input-framer/input"

# Status Bar
myStatusBar = new StatusBarLayer
	# iOS version
	version: 11
	# Text
	carrier: "VIVO"
	 # if not set, will use local time
	percent: 100
	
	# Show or hide status items
	signal: true
	wifi: false
	powered: false
	showPercentage: true
	ipod: false # also affects signal and carrier
	
	# Colors
	style: "light"
	foregroundColor: "#FFF"
	backgroundColor: "transparent"
	vibrant: false

# States for visual animations


# Set default animation options
Framer.Defaults.Animation =
	time: 2
	curve: Spring(damping: 0.65) 

# Set up FlowComponent
flow = new FlowComponent
flow.showNext(Welcome)

myStatusBar.parent = null
IndicatorDots.parent

# Switch on click
GetStarted.onClick ->
	flow.showNext(OnboardingConnect)

# Switch on click
ConnectNext.onClick ->
	flow.showNext(OnboardingChat)

ChatBack.onClick ->
	flow.showPrevious()
	
ChatNext.onClick ->
	flow.showNext(OnboardingShare)

ShareBack.onClick ->
	flow.showPrevious()

Restart.onClick ->
	flow.showNext(Login)

criarConta.onClick ->
	flow.showNext(onboardingA)

previousOnboardingA.onClick ->
	flow.showPrevious()

nextB.onClick ->
	flow.showNext(onboardingB)

previousOnboardingB.onClick ->
	flow.showPrevious()
nextHome.onClick ->
	flow.showNext(Home)
walletHeight.onClick ->
	flow.showNext(HomeCashBack)
carteira.onClick ->
	flow.showOverlayLeft(Home)
qrCodeHome.onClick ->
	flow.showOverlayBottom(QRCODE)
qrCodeCash.onClick ->
	flow.showOverlayBottom(QRCODE)
dividaHome.onClick ->
	flow.showOverlayBottom(Divida)
dividaCash.onClick ->
	flow.showOverlayBottom(Divida)
qrBackHome.onClick ->
	flow.showOverlayLeft(Home)
dividaBackHome.onClick ->
	flow.showOverlayLeft(Home)
dividaA.onClick ->
	flow.showOverlayRight(detalhesA)
quitar.onClick ->
	flow.showOverlayCenter(detalhesOverlay)
homePopup.onClick ->
	flow.showOverlayTop(Home)
aceitarQR.onClick ->
	flow.showOverlayBottom(QRCartao)
Saldos.onClick ->
	flow.showOverlayCenter(QrPopup)
credHome.onClick ->
	flow.showOverlayBottom(CreditoPersonalizado)
credCash.onClick ->
	flow.showOverlayTop(CreditoPersonalizado)
DetalhesHome.onClick ->
	flow.showOverlayLeft(Home)
voltarDivida.onClick ->
	flow.showOverlayLeft(Divida)
plus.onClick ->
	flow.showOverlayTop(NovaCobranca)
# Termos


# Start Welcome screen animations

# Set initial state for logo and start button
for layer in [GetStarted]
	layer.opacity = 0

# Animate the title and start button in when the last logo piece animates
			
	GetStarted.animate
		opacity: 1
		y: 530
		options: 
			delay: 0.5

IndicatorDots.opacity = 0
activateDot = (index) ->
	IndicatorDots.children[index].animate
		opacity: 1
		scale: 1.1	



# Onboarding A

inputOnboardingA = new InputModule.Input
  setup: true # Change to true when positioning the input so you can see it
  x: 9
  y: 205
  width: 318
  height: 30
  parent: onboardingA
  fontSize: 16
  color: "#FFF"
  textColor: "#FFF"
  type: "tel"
  backgroundColor: "transparent"
  placeholder: "Digite o seu CPF..."
  placeholderColor: "#FFF"


# Onboarding B

inputOnboardingB = new InputModule.Input
  setup: true # Change to true when positioning the input so you can see it
  x: 9
  y: 170
  width: 318
  height: 30
  parent: onboardingB
  fontSize: 16
  color: "#FFF"
  textColor: "#FFF"
  type: "text"
  backgroundColor: "transparent"
  placeholder: "Digite a sua senha..."
  placeholderColor: "#FFF"
confirmaSenha = new InputModule.Input
  setup: true # Change to true when positioning the input so you can see it
  x: 9
  y: 245
  width: 318
  height: 30
  parent: onboardingB
  fontSize: 16
  color: "#FFF"
  textColor: "#FFF"
  type: "text"
  backgroundColor: "transparent"
  placeholder: "Digite a sua senha..."
  placeholderColor: "#FFF"

# Home
scroll = new ScrollComponent
	y: Header.height+ walletHeight.height
	parent: Home
	scrollHorizontal: false
	width: Screen.width
	height: Screen.height - Header.height - TabBar.height

scroll.sendToBack()
Feed.parent = scroll.content

# Cashback
scrollCash = new ScrollComponent
	y: HeaderCash.height+ walletHeightCash.height
	parent: HomeCashBack
	scrollHorizontal: false
	width: Screen.width
	height: Screen.height - HeaderCash.height - TabBarCash.height

scrollCash.sendToBack()
TabBarCash.bringToFront()
FeedCashBack.parent = scrollCash.content



