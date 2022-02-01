const mainfunc = () => {

  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    loop: true,
    speed: 900,
    spaceBetween: 70,
    centeredSlides: true,
    slideToClickedSlide: true,
    toggle: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      320: {
        direction: 'vertical',
        slidesPerView: 3,
        mousewheel: true,
        loop: true,
        spaceBetween: 110,
      },
      891: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 70
      }
    }
  });

  var body = document.querySelector('body')
  var modalForm = document.querySelector('.modal');
  var openFormModalBtn = document.querySelector('.button__open-form');

  openFormModalBtn.addEventListener('click', () => {
    modalForm.classList.add('active');
    body.classList.add('lock');
  });

  modalForm.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal__inner');
    if (!modal) {
      modalForm.classList.remove('active');
      body.classList.remove('lock')
    };
  });

  document.addEventListener('keyup', (e) => {
    if (e.code === "Escape") {
      modalForm.classList.remove('active');
      body.classList.remove('lock');
    };
  });

  
  
  const findMyCity = () => {
    const status = document.querySelector('.user-city');
    const success = (position) => {
      console.log(position)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude + ' ' + longitude)

      const GeoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`

      fetch(GeoApiUrl)
        .then(res => res.json())
        .then(data => {
          status.textContent = data.city
        })
    }

    const error = () => {
      let ip = '';
      let XMLHttp = new XMLHttpRequest();

      XMLHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let json__info = JSON.parse(this.responseText);
          status.textContent = json__info.city;
          ;
        }
      };
      XMLHttp.open("GET", "https://ipwhois.app/json/?lang=ru" + ip, true);
      XMLHttp.send();
    }

    navigator.geolocation.getCurrentPosition(success, error);

  }

  window.onload = function () {
    findMyCity();
  }


}

mainfunc();
