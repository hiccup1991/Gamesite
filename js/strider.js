var country = "United State";
$(document).ready(function() {
  "use strict";

  // NAVBAR RESIZE FUNCTION
  $(window).scroll(function() {
    var value = $(this).scrollTop();
    if (value > $(window).height() * 1) $(".navbar-dark").addClass("scrolled");
    else $(".navbar-dark").removeClass("scrolled");
  });

  //HAMBURGER MENU ANIMATION
  $("#hamburger").on("click", function() {
    $(this).toggleClass("open");
  });

  // SMOOTH SCROLLING TO ANCHORS
  $("a[href*=\\#]:not([href=\\#]):not(.control-right, .control-left)").on(
    "click",
    function() {
      if (
        location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 100
            },
            1000
          );
          return false;
        }
      }
    }
  );

  // ANIMATIONS
  var $animation_elements = $(".animation-element");
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = window_top_position + window_height;

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top + 150;
      var element_bottom_position = element_top_position + element_height;

      //check to see if this current container is within viewport
      if (
        element_bottom_position >= window_top_position &&
        element_top_position <= window_bottom_position
      ) {
        $element.addClass("in-view");
      }
    });
  }
  $window.on("scroll resize", check_if_in_view);
  $window.trigger("scroll");

  // GET CLIENT COUNTRY
  $.ajax("http://ip-api.com/json").then(
    function success(response) {
      //alert(response.country);
      country = response.country;
      setLanguage(response.country);
    },

    function fail(data, status) {
      setLanguage("United State");
    }
  );
  //STOP VIDEO FROM PLAYING AFTER CLOSING A MODAL
  $("body").on("hidden.bs.modal", function(e) {
    var $iframes = $(e.target).find("iframe");
    $iframes.each(function(index, iframe) {
      $(iframe).attr("src", $(iframe).attr("src"));
    });
  });

  // LIGHTBOX OPTIONS
  lightbox.option({
    resizeDuration: 500,
    imageFadeDuration: 500,
    wrapAround: true
  });

  // VIDEO LIGHTBOX
  $(".js-video-button").modalVideo();

  // LOAD GOOGLE MAP
  google.maps.event.addDomListener(window, "load", init);
  function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 11,

      // The latitude and longitude to center the map (always required)
      center: new google.maps.LatLng(40.67, -73.94), // New York

      // How you would like to style the map.
      // This is where you would paste any style found on Snazzy Maps.
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "on" },
            { color: "#000000" },
            { lightness: 16 }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ lightness: 20 }, { color: "#000000" }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }]
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text.fill",
          stylers: [{ visibility: "on" }, { color: "#ffffff" }]
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.fill",
          stylers: [{ visibility: "simplified" }]
        },
        {
          featureType: "administrative.province",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "administrative.province",
          elementType: "labels.text.stroke",
          stylers: [
            { weight: "0.01" },
            { invert_lightness: true },
            { color: "#f26c4f" }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 20 }]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 21 }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            { visibility: "simplified" },
            { weight: "0.05" },
            { color: "#ffffff" },
            { lightness: 17 }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            { color: "#E48632" },
            { weight: "0.10" },
            { invert_lightness: true },
            { lightness: 29 }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#E48632" }]
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [{ weight: "0.30" }]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 18 }]
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 16 }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 19 }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#000000" }, { lightness: 17 }]
        }
      ]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById("map-canvas");

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var image = "images/map_marker.png";
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(40.67, -73.94),
      map: map,
      icon: image,
      title: "Snazzy!"
    });
  }

  // // FORM SCRIPTS
  // $("#contactForm")
  //   .validator()
  //   .on("submit", function(event) {
  //     if (event.isDefaultPrevented()) {
  //       // handle the invalid form...
  //       formError();
  //       submitMSG(false, "Did you fill in the form properly?");
  //     } else {
  //       // everything looks good!
  //       event.preventDefault();
  //       submitForm();
  //     }
  //   });

  // function submitForm() {
  //   // Initiate Variables With Form Content
  //   var name = $("#name").val();
  //   var email = $("#email").val();
  //   var message = $("#message").val();

  //   $.ajax({
  //     type: "POST",
  //     url: "php/form-process.php",
  //     data: "name=" + name + "&email=" + email + "&message=" + message,
  //     success: function(text) {
  //       if (text === "success") {
  //         formSuccess();
  //       } else {
  //         formError();
  //         submitMSG(false, text);
  //       }
  //     }
  //   });
  // }

  // function formSuccess() {
  //   $("#contactForm")[0].reset();
  //   submitMSG(true, "Message Submitted!");
  // }

  // function formError() {
  //   $("#contactForm").one(
  //     "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
  //     function() {
  //       $(this).removeClass();
  //     }
  //   );
  // }

  // function submitMSG(valid, msg) {
  //   if (valid) {
  //     var msgClasses = "h3 text-center text-success";
  //   } else {
  //     var msgClasses = "h3 text-center text-danger";
  //   }
  //   $("#msgSubmit")
  //     .removeClass()
  //     .addClass(msgClasses)
  //     .text(msg);
  // }

  // NEWSLETTER SIGNUP SCRIPTS
  // $("#newsletter")
  //   .validator()
  //   .on("submit", function(event) {
  //     if (event.isDefaultPrevented()) {
  //       // handle the invalid form...
  //       signupError();
  //       signupMSG(false, "Did you fill in the form properly?");
  //     } else {
  //       // everything looks good!
  //       event.preventDefault();
  //       submitSignup();
  //     }
  //   });

  // function submitSignup() {
  //   // Initiate Variables With Form Content
  //   var emailsign = $("#emailsign").val();

  //   $.ajax({
  //     type: "POST",
  //     url: "php/newsletter-process.php",
  //     data: "&emailsign=" + emailsign,
  //     success: function(text) {
  //       if (text === "success") {
  //         signupSuccess();
  //       } else {
  //         signupError();
  //         signupMSG(false, text);
  //       }
  //     }
  //   });
  // }

  function signupSuccess() {
    $("#newsletter")[0].reset();
    signupMSG(true, "Awesome! Thank you for subscribing!");
  }

  function signupError() {
    $("#newsletter").one(
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
      function() {
        $(this).removeClass();
      }
    );
  }

  function signupMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center tada animated text-success";
    } else {
      var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSignup")
      .removeClass()
      .addClass(msgClasses)
      .text(msg);
  }
});

function setLanguage(country) {
  if (country == "China" || country == "Hong Kong") {
    $("#nav-about").html("关于");
    $("#nav-games").html("游戏");
    $("#nav-careers").html("体验");
    $("#nav-contact").html("联系");
    $("#hero-text").html('我们制作了<span class="colored">很棒的游戏</span>');
    $("#about-title").html('关于<span class="colored">我们');
    $("#about-content").html(
      "我们是一群热爱游戏的画家，设计师，程序员。我们只希望为您开发至好的游戏。联系我们，你要开发的游戏我们都能做到。"
    );
    $("#games-title").html('我们的<span class="colored">游戏');
    $("#sort_by_tag").html("分类");
    $("#sort_by_new a").html("新");
    $("#sort_by_all a").html("全部");
    $("#sort_by_pc a").html("休闲");
    $("#sort_by_mobile a").html("烧脑");
    $("#careers-title").html('体验我们的<span class="colored">游戏');
    $("#digital-galaxy").html("关注“数字星河”公众号");
    $("#wechat-platform").html("关注“微信”公众号");
    $("#wechat-id").html("告诉我们您的微信号");
    $("#wechatID #subscribe").html("加我的微信到游戏体验");
    $("#newsletter-title").html("订阅我们的新游戏报告");
    $("#newsletter-body").html(
      "告诉我们您的邮件地址。当我们有新游戏的时候，会用邮件通知您。"
    );
    $("#newsletter #emailsign").attr("placeholder", "邮件地址");
    $("#newsletter #subscribe").html("订阅");
    $("#contact-us").html('保持<span class="colored">联系</span>');
    $("#contactForm #message").attr("placeholder", "内容");
    $("#contactForm #message").attr("data-error", "内容是必须的");
    $("#contactForm #name").attr("placeholder", "名字");
    $("#contactForm #name").attr("data-error", "名字是必须的");
    $("#contactForm #email").attr("placeholder", "邮件地址");
    $("#contactForm #email").attr("data-error", "邮件地址是必须的");
    $("#contactForm #required").html("* 必须");
    $("#leave-message").html("给我们留言");
    $("#send-message").html("发信息");
    $("#our-details").html("我们的细节");
    $("#address").html(
      'Address: <span class="colored">深圳湾生态园6栋南座912</span>'
    );
    $("#copyright").html("&copy; 数字星河科技有限公司 ");
    var year = new Date().getFullYear();
    $("#copyright").append(year);
    for (var i = 0; i < gamelist_ch.length; i++) addGame(gamelist_ch[i], "all");
  } else {
    for (var i = 0; i < gamelist_en.length; i++) addGame(gamelist_en[i], "all");
  }
}

function addGame(game, selector) {
  var html = '<div class="row game-card';
  if (selector != "all") {
    var flag = false;
    for (var i = 0; i < game.type.length; i++) {
      //alert(game.type[i]);
      if (game.type[i] == selector) {
        flag = true;
        break;
      }
    }
    if (flag == false) return;
  }
  for (var i = 0; i < game.type.length; i++) {
    html += " ";
    if (game.type[i] == "新" || game.type[i] == "new") {
      html += "new";
    } else if (game.type[i] == "烧脑" || game.type[i] == "mobile") {
      html += "mobile";
    } else if (game.type[i] == "休闲" || game.type[i] == "pc") {
      html += "pc";
    } else if (game.type[i] == "全部" || game.type[i] == "all") {
      html += "all";
    }
  }
  html += '">';
  html += '<div class="col-md-5 game-card-left">';
  html +=
    '<a href="#" class="js-video-button" data-video-id="285232623" data-channel="vimeo">';
  html += '<div class="overlay">';
  html += '<i class="fa fa-play fa-3x"></i>';
  html += "</div>";
  html += '<img id="game-item" src="GameData/';
  html += game.name;
  html += '/demo.png" class="img-fluid" alt="video thumbnail">';
  html += "</a>";
  html += "</div>";
  html += '<div class="col-md-7 game-card-right">';
  html += '<h2 class="short-hr-left">';
  html += game.name;
  html += "</h2>";
  html += '<p class="tags"><span class="subtle">';
  html += game.type[0];

  for (var i = 1; i < game.type.length; i++) {
    html += " | " + game.type[i];
  }
  html += "</span></p>";
  html += '<p class="game-description">';
  html += game.description;
  html += "</p>";
  html += '<div class="row">';
  html += '<div class="col-md-6">';
  html += '<img src="GameData/';
  html += game.name;
  html += '/experience.png" class="img-fluid">';
  html += '<p id="experience">Experience</p>';
  html += "</div>";
  html += '<div class="col-md-6">';
  html += '<img src="GameData/';
  html += game.name;
  html += '/online.png" class="img-fluid">';
  html += '<p id="online">Online</p>';
  html += "</div>";
  html += "</div>";
  html += "</div>";
  html += "</div>";
  $("#game-portofolio").append(html);
  $("#game-portofolio").css("height", "auto");
}
window.onload = function() {
  //INITIALIZE ISOTIPE
  // cache container
  var $container = $(".games-portfolio");
  // initialize isotope
  $container.isotope({
    // options...
  });
  // filter items when filter link is clicked
  $(".game-tags li a").on("click", function() {
    var selector = $(this).attr("data-filter");
    //$container.isotope({ filter: selector });
    $("#game-portofolio").html("");
    if (country == "China") {
      switch (selector) {
        case "新":
          selector = "new";
          break;
        case "烧脑":
          selector = "mobile";
          break;
        case "休闲":
          selector = "pc";
          break;
        case "全部":
          selector = "all";
          break;
      }
      for (var i = 0; i < gamelist_ch.length; i++)
        addGame(gamelist_ch[i], selector);
    } else for (var i = 0; i < gamelist_en.length; i++) addGame(gamelist_en[i], selector);
    return false;
  });
  // HIDE LOADING SCREEN WHEN PAGE IS LOADED
  $("#progress").animate({ width: "100%" }, 300, function() {
    $("#loader-wrapper").addClass("loaded");
  });
};
