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

Phone.states.hide = 
	opacity: 0
	y: 60
	
Phone.states.show = 
	opacity: 1
	y: 40
	options: 
		time: 1

Mac.states.hide = 
	opacity: 0
	y: 30

Mac.states.show = 
	opacity: 1
	y: 5
	options: 
		time: 1
		delay: 0.1

Message1.states.hide = 
	opacity: 0
	y: 230

Message1.states.show = 
	opacity: 1
	y: 200
	options: 
		time: 1

Message2.states.hide = 
	opacity: 0
	y: 310

Message2.states.show = 
	opacity: 1
	y: 300
	options: 
		time: 1
		delay: 0.2

Photo1.states.hide = 
	opacity: 0
	x: 155
	y: 210
	rotation: 0

Photo1.states.show = 
	opacity: 1
	x: 120
	y: 210
	rotation: -15
	options: 
		time: 1
	
Photo2.states.hide = 
	opacity: 0
	x: 165
	y: 225
	rotation: 0
	
Photo2.states.show = 
	opacity: 1
	x: 200
	y: 230
	rotation: 15
	options: 
		time: 1

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

# Fires right after the Flow Component changes a page 
flow.onTransitionEnd ->
	for layer in [Phone, Mac, Message1, Message2, Photo1, Photo2]
		layer.stateSwitch("hide")
		
	for dot in IndicatorDots.children
		dot.animate
			opacity: 0.5
			scale: 1
	
	if flow.current is OnboardingConnect
		Phone.animate("show")
		Mac.animate("show")
		activateDot(0)
	
	if flow.current is OnboardingChat
		Message1.animate("show")
		Message2.animate("show")
		activateDot(1)
	
	if flow.current is OnboardingShare
		Photo1.animate("show")
		Photo2.animate("show")
		activateDot(2)
	
	# Show indicator dots after welcome screen
	if flow.current isnt Welcome
		IndicatorDots.animate
			opacity: 1
			options: 
				time: 0.3

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



