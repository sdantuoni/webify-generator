class Utilities

	constructor: () ->

	# left: 37, up: 38, right: 39, down: 40,
	# spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	keys =
		37: 1
		38: 1
		39: 1
		40: 1

	preventDefault = (e) ->
		e = e or window.event
		if e.preventDefault
			e.preventDefault()
		e.returnValue = false
		return

	preventDefaultForScrollKeys = (e) ->
		if keys[e.keyCode]
			preventDefault e
			return false
		return

	disableScroll: =>
		if window.addEventListener
			window.addEventListener 'DOMMouseScroll', preventDefault, false
		window.onwheel = preventDefault
		# modern standard
		window.onmousewheel = document.onmousewheel = preventDefault
		# older browsers, IE
		window.ontouchmove = preventDefault
		# mobile
		document.onkeydown = preventDefaultForScrollKeys
		return

	enableScroll: =>
		if window.removeEventListener
			window.removeEventListener 'DOMMouseScroll', preventDefault, false
		window.onmousewheel = document.onmousewheel = null
		window.onwheel = null
		window.ontouchmove = null
		document.onkeydown = null
		return

	share: (shareClass, params) =>
		# params = '?c=' + this.REcode
		urls = {
			facebook: 'https://www.facebook.com/sharer/sharer.php?u'
			twitter: 'https://twitter.com/share?url'
			whatsapp: 'whatsapp://send?text'
			whatsappWeb: 'http://web.whatsapp.com'
		}
		$(shareClass).find('a[data-share]').each (_, link) =>
			# Set Re code on links (as a param)
			link = $(link)
			site = window.location
			modifier = link.data('share');
			if ( @getMobileOperatingSystem() != "ios" && @getMobileOperatingSystem() != "android" && @getMobileOperatingSystem() != "windows-phone" ) and modifier == "whatsapp"
				link.attr("href", urls['whatsappWeb'] )
			else
				if modifier == "whatsapp"	
					link.attr("href", urls[modifier] + "=" + window.urlBase + "w.html" + (params || '') )
				else
					link.attr("href", urls[modifier] + "=" + site.origin + site.pathname + (params || '') )

	
	getMobileOperatingSystem: =>
		userAgent = navigator.userAgent || navigator.vendor || window.opera

		if /windows phone/i.test(userAgent)
			return "windows-phone"

		if /android/i.test(userAgent)
			return "android"

		if /iPad|iPhone|iPod/.test(userAgent) and !window.MSStream
			return "ios";

		return "unknown";

module.exports = Utilities