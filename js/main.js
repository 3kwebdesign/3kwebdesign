$(document).ready(function()
{
	Web.init();
	Web.Menu.init();
	Web.Contact.init();
});

Web = {
	init: function()
	{
		this.page = $('#page');
		this.parts = $('#page .part');
	}
};

Web.Menu = {
	init: function()
	{
		var self = this;
		this.header = $('#header');
		this.primary_nav_items = $('#header .right .primary-nav a');
		this.slick_btn = $('#header .right .slick-nav .slick-btn');
		this.slick_menu_items = $('#slick-menu .content .menu a');

		this.toggleHeader();
		self.toggleNavItemWhenScrolled();

		$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 800);
				return false;
			}
		}
		});

		this.primary_nav_items.on('click', function()
		{
			self.toggleNavItem($(this));
		});

		this.slick_menu_items.on('click', function()
		{
			self.toggleNavItem($(this));
		});

		this.slick_btn.on('click', function()
		{
			self.toggleSlickMenu();
		});

		this.slick_menu_items.on('click', function()
		{
			self.toggleSlickMenu();
		});

		document.addEventListener('scroll', function()
		{
			self.toggleHeader();
			self.toggleNavItemWhenScrolled();
		});

		//If window was resized and slick menu is still on -> toggle
		window.addEventListener('resize', function()
		{
			if(this.innerWidth > 850 && Web.page.hasClass('slick_menu_on'))
			{
				self.toggleSlickMenu();
			}
		});
	},

	toggleHeader: function()
	{
		if((window.pageYOffset > this.header.height() && this.header.hasClass('scrolled_off')) ||
			   (window.pageYOffset < this.header.height() && this.header.hasClass('scrolled_on')))
		{
			this.header.toggleClass('scrolled_off scrolled_on');
		}
	},

	toggleNavItemWhenScrolled: function()
	{
		for(var i = 0; i < Web.parts.length; i++)
		{
			var part = $(Web.parts[i]);
			var part_check = Math.floor((window.pageYOffset + this.header.outerHeight()) /
										(part.position().top + part.outerHeight()));
			
			if(part_check === 0)
			{
				this.toggleNavItem($(this.primary_nav_items[i]));
				return;
			}
		}

	},

	toggleNavItem: function(item)
	{
		if(item.hasClass('active')) return;

		var itemIndex = this.primary_nav_items.index(item);
		if(itemIndex === -1) itemIndex = this.slick_menu_items.index(item);

		for(var i = 0; i < this.primary_nav_items.length; i++)
		{
			if(i === itemIndex) continue;

			var item2 = $(this.primary_nav_items[i]);
			if(item2.hasClass('active'))
			{
				item2.toggleClass('active');
				$(this.slick_menu_items[i]).toggleClass('active');
				break;
			}
		}

		$(this.primary_nav_items[itemIndex]).toggleClass('active');
		$(this.slick_menu_items[itemIndex]).toggleClass('active');
	},

	toggleSlickMenu: function()
	{
		Web.page.toggleClass('slick_menu_off slick_menu_on');
	}
};

Web.Contact = {
	init: function()
	{
		var sendMail = $('#sendMail'), mailSubject = $('#mailSubject'), mailSenderMail = $('#mailSenderMail'), mailSender = $('#mailSender'), mailText = $('#mailText');
	
		sendMail.click(function(){
			$.post('system/sendMail.php', {'mailSender': mailSender.val(), 'mailSenderMail': mailSenderMail.val(), 'mailSubject': mailSubject.val(), 'message': mailText.val()}, function(response){
			if (response == 'ok') {
				sweetAlert("Žůžo", "Za chvíli se Vám ozveme, mějte příjemný zbytek dne!", "success");
			} else {
				console.log(response);
			}
			});
		});
	}
};