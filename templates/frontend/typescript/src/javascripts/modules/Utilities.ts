

try {
    import * as $ from "jquery";
} catch(e) {
    console.error("The Utilities file requires JQuery, please remove it or install JQuery");
    process.exit(e.code);
}

let keys = undefined;
let preventDefault = undefined;
let preventDefaultForScrollKeys = undefined;

		var constructor = function () {
			this.disableScroll = this.disableScroll.bind(this);
			this.enableScroll = this.enableScroll.bind(this);
			this.share = this.share.bind(this);
			this.getMobileOperatingSystem = this.getMobileOperatingSystem.bind(this);
		}

		var disableScroll = function() {
			if (window.addEventListener) {
				window.addEventListener('DOMMouseScroll', preventDefault, false);
			}
			window.onwheel = preventDefault;
			// modern standard
			window.onmousewheel = (document.onmousewheel = preventDefault);
			// older browsers, IE
			window.ontouchmove = preventDefault;
			// mobile
			document.onkeydown = preventDefaultForScrollKeys;
		}

		var enableScroll = function() {
			if (window.removeEventListener) {
				window.removeEventListener('DOMMouseScroll', preventDefault, false);
			}
			window.onmousewheel = (document.onmousewheel = null);
			window.onwheel = null;
			window.ontouchmove = null;
			document.onkeydown = null;
		}

		var share = function(shareClass, params) {
			params = '?c=' + this.REcode
			const urls = {
				facebook: 'https://www.facebook.com/sharer/sharer.php?u',
				twitter: 'https://twitter.com/share?url',
				whatsapp: 'whatsapp://send?text',
				whatsappWeb: 'http://web.whatsapp.com'
			};
			return $(shareClass).find('a[data-share]').each((_, link) => {
				// Set Re code on links (as a param)
				link = $(link);
				const site = window.location;
				const modifier = link.data('share');
				if (( (this.getMobileOperatingSystem() != "ios") && (this.getMobileOperatingSystem() !== "android") && (this.getMobileOperatingSystem() !== "windows-phone") ) && (modifier === "whatsapp")) {
					return link.attr("href", urls['whatsappWeb'] );
				} else {
					if (modifier === "whatsapp") {	
						return link.attr("href", urls[modifier] + "=" + "http://vivo4g.com.br/vivo-easy/" + "w.html" + (params || '') );
					} else {
						return link.attr("href", urls[modifier] + "=" + site.origin + site.pathname + (params || '') );
					}
				}
			});
		}

	
		var getMobileOperatingSystem = function() {
			// || window.opera
			const userAgent = navigator.userAgent || navigator.vendor;

			if (/windows phone/i.test(userAgent)) {
				return "windows-phone";
			}

			if (/android/i.test(userAgent)) {
				return "android";
			}

			// if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			// 	return "ios";
			// }

			return "unknown";
		}

	export {constructor, disableScroll, enableScroll, share, getMobileOperatingSystem}