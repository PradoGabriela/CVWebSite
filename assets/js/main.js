/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

	// Expandable text functionality
		$(document).on('click', '.read-more-btn', function() {
			console.log('jQuery: Read more button clicked'); // Debug log
			var $btn = $(this);
			var $container = $btn.closest('.description-container');
			var $text = $container.find('.description-text');
			
			console.log('jQuery Button:', $btn); // Debug log
			console.log('jQuery Text element:', $text); // Debug log
			
			if ($text.hasClass('expanded')) {
				$text.removeClass('expanded');
				$btn.text('Read More');
				console.log('jQuery: Collapsed text'); // Debug log
			} else {
				$text.addClass('expanded');
				$btn.text('Read Less');
				console.log('jQuery: Expanded text'); // Debug log
			}
		});

})(jQuery);

// Fallback vanilla JavaScript for read more functionality (outside jQuery wrapper)
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM Content Loaded - Setting up vanilla JS event listeners');
	console.log('jQuery available:', typeof $ !== 'undefined');
	console.log('Number of read-more buttons found:', document.querySelectorAll('.read-more-btn').length);
	console.log('Number of description containers found:', document.querySelectorAll('.description-container').length);
	
	document.addEventListener('click', function(e) {
		console.log('Click detected on:', e.target);
		if (e.target.classList.contains('read-more-btn')) {
			console.log('Vanilla JS: Read more button clicked');
			const btn = e.target;
			const container = btn.closest('.description-container');
			const text = container ? container.querySelector('.description-text') : null;
			
			console.log('Vanilla JS Button:', btn);
			console.log('Vanilla JS Container:', container);
			console.log('Vanilla JS Text element:', text);
			
			if (!container) {
				console.error('Container not found!');
				return;
			}
			
			if (!text) {
				console.error('Text element not found!');
				return;
			}
			
			if (text.classList.contains('expanded')) {
				text.classList.remove('expanded');
				btn.textContent = 'Read More';
				console.log('Vanilla JS: Collapsed text');
			} else {
				text.classList.add('expanded');
				btn.textContent = 'Read Less';
				console.log('Vanilla JS: Expanded text');
			}
		}
	});
});

// Global function for inline onclick (backup method)
function toggleReadMore(btn) {
	console.log('toggleReadMore function called');
	const container = btn.closest('.description-container');
	const text = container ? container.querySelector('.description-text') : null;
	
	console.log('Button:', btn);
	console.log('Container:', container);
	console.log('Text element:', text);
	
	if (!container || !text) {
		console.error('Could not find required elements');
		return;
	}
	
	if (text.classList.contains('expanded')) {
		text.classList.remove('expanded');
		btn.textContent = 'Read More';
		console.log('Collapsed text');
	} else {
		text.classList.add('expanded');
		btn.textContent = 'Read Less';
		console.log('Expanded text');
	}
}

// Contact Form AJAX Handler
document.addEventListener('DOMContentLoaded', function() {
	console.log('🔥 Contact form script loading...');
	
	function initContactForm() {
		console.log('🚀 Initializing contact form...');
		
		var form = document.getElementById('contact-form');
		var messageDiv = document.getElementById('form-message');
		var submitBtn = document.getElementById('submit-btn');
		
		if (!form) {
			console.log('ℹ️ Contact form not found (probably not on contact page)');
			return;
		}
		
		if (!messageDiv) {
			console.error('❌ Message div not found!');
			return;
		}
		
		if (!submitBtn) {
			console.error('❌ Submit button not found!');
			return;
		}
		
		console.log('✅ All form elements found, setting up AJAX...');
		
		// Remove any existing event listeners
		form.onsubmit = null;
		
		form.addEventListener('submit', function(e) {
			console.log('📝 FORM SUBMITTED - Preventing default!');
			e.preventDefault();
			e.stopPropagation();
			
			// Get form values directly
			var nameField = document.getElementById('name');
			var emailField = document.getElementById('email');
			var subjectField = document.getElementById('subject');
			var messageField = document.getElementById('message');
			
			if (!nameField || !emailField || !subjectField || !messageField) {
				console.error('❌ Form fields not found!');
				return false;
			}
			
			var name = nameField.value.trim();
			var email = emailField.value.trim();
			var subject = subjectField.value.trim();
			var message = messageField.value.trim();
			
			console.log('📋 Form data:', { name, email, subject, message });
			
			// Basic validation
			if (!name || !email || !subject || !message) {
				showMessage('All fields are required', false);
				return false;
			}
			
			// Email validation
			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				showMessage('Please enter a valid email address', false);
				return false;
			}
			
			// Disable submit button
			submitBtn.disabled = true;
			submitBtn.value = 'Sending...';
			
			// Prepare data
			var data = {
				name: name,
				email: email,
				subject: subject,
				message: message
			};
			
			console.log('📤 Sending AJAX request with data:', data);
			
			// Create and send AJAX request
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/contact', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			
			xhr.onload = function() {
				console.log('📨 Response received. Status:', xhr.status);
				
				submitBtn.disabled = false;
				submitBtn.value = 'Send Message';
				
				if (xhr.status === 200) {
					try {
						var response = JSON.parse(xhr.responseText);
						console.log('✅ Parsed response:', response);
						
						if (response.success) {
							showMessage(response.message, true);
							form.reset();
						} else {
							showMessage(response.message, false);
						}
					} catch (e) {
						console.error('❌ Error parsing JSON response:', e);
						console.log('Raw response:', xhr.responseText);
						showMessage('Error processing server response', false);
					}
				} else {
					console.error('❌ HTTP error status:', xhr.status);
					showMessage('Server error. Please try again later.', false);
				}
			};
			
			xhr.onerror = function() {
				console.error('❌ Network error occurred');
				submitBtn.disabled = false;
				submitBtn.value = 'Send Message';
				showMessage('Network error. Please check your connection and try again.', false);
			};
			
			xhr.send(JSON.stringify(data));
			return false;
		});
		
		function showMessage(msg, isSuccess) {
			console.log('📢 Showing message:', msg, 'Success:', isSuccess);
			
			messageDiv.innerHTML = msg;
			messageDiv.style.display = 'block';
			messageDiv.style.padding = '15px';
			messageDiv.style.borderRadius = '5px';
			messageDiv.style.marginBottom = '20px';
			
			if (isSuccess) {
				messageDiv.style.backgroundColor = '#d4edda';
				messageDiv.style.color = '#155724';
				messageDiv.style.border = '1px solid #c3e6cb';
			} else {
				messageDiv.style.backgroundColor = '#f8d7da';
				messageDiv.style.color = '#721c24';
				messageDiv.style.border = '1px solid #f5c6cb';
			}
			
			// Scroll to message
			setTimeout(function() {
				messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 100);
		}
		
		console.log('🎯 Contact form setup complete!');
	}
	
	// Initialize contact form (with small delay to ensure DOM is ready)
	setTimeout(initContactForm, 100);
});