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

  var modalForm = document.getElementById('form__modal');
  var openFormModalBtn = document.getElementById('form__button');

  openFormModalBtn.addEventListener('click', () => {
    modalForm.classList.add('active');
  });

  modalForm.addEventListener('click', (e) => {
    const is__modal = e.target.closest('.modal__inner');
    if (!is__modal) {
      modalForm.classList.remove('active');
    }
  })

  modalForm.addEventListener('keyup', (e) => {
    const is__modal = e.target.closest('.modal__inner');
    if (e.key === 'Escape') {
      modalForm.classList.remove('active');
    }
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
