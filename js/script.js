"use strict"

document.addEventListener('DOMContentLoaded', function () {

  if (window.matchMedia("(max-width: 1027.98px)").matches) {
    const swiperProduct = new Swiper('.product__swiper', {
      slidesPerView: 3,
      spaceBetween: 24,
      pagination: {
        el: '.product__swiper-pagination',
        type: 'bullets',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        575.98: {
          slidesPerView: 2,
        },
        991.98: {
          slidesPerView: 3,
        }
      }
    });
  }

  if (window.matchMedia("(max-width: 1027.98px)").matches) {
    const swiperProductAccordeon = new Swiper('.product-accordeon__swiper', {
      slidesPerView: 3,
      spaceBetween: 24,
      breakpoints: {
        0: {
          slidesPerView: 1.4,
          spaceBetween: 16,
        },
        575.98: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        991.98: {
          slidesPerView: 3,
        }
      },
    });
  }



  // Перевірка наявності слайдів для приховування навігації
  // function toggleNavigation() {
  //   var isNavigationHidden = mySwiper.slides.length <= 1;
  //   var navigationElements = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');

  //   navigationElements.forEach(function (element) {
  //     element.style.display = isNavigationHidden ? 'none' : 'block';
  //   });
  // }

  // Виклик функції при завантаженні та зміні слайдів
  // swiper.on('init', toggleNavigation);
  // swiper.on('slideChange', toggleNavigation);


  // Пишемо функцію яка буде при адаптиві робити з блоку слайдер.
  function mobSlideActive(cls) {
    let slideItem = document.querySelectorAll(`.${cls}`)
    console.log(`.${cls}`)
    if (slideItem.length > 0) {
      slideItem.forEach(slide => {
        if (window.matchMedia("(max-width: 1023.98px)").matches) {
          slide.classList.add('swiper-slide')
        } else {
          slide.classList.remove('swiper-slide')
        }
      })
    }
  }
  mobSlideActive("swiper-slide")
  window.addEventListener('resize', mobSlideActive("swiper-slide"))

  // // Перевірка на сенсорні екрани, і додаємо класс для body.
  // const isMobile = {
  //     Android: function() {
  //         return navigator.userAgent.match(/Android/i);
  //     },
  //     BlackBorry: function() {
  //         return navigator.userAgent.match(/BlackBorry/i);
  //     },
  //     IOS: function() {
  //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  //     },
  //     Opera: function() {
  //         return navigator.userAgent.match(/Opera Mini/i);
  //     },
  //     Windows: function() {
  //         return navigator.userAgent.match(/IEMobile/i);
  //     },
  //     any: function() {
  //         return (
  //             isMobile.Android() ||
  //             isMobile.BlackBorry() ||
  //             isMobile.IOS() ||
  //             isMobile.Opera() ||
  //             isMobile.Windows()
  //         );
  //     }
  // };

  // if (isMobile.any()){
  //     document.body.classList.add('_touch');
  // } else {
  //     document.body.classList.add('_pc');
  // }

  // let events = document.body.classList.contains('_touch') ? 'click' : 'mousemove';

  // Робимо бургер меню.
  function burger() {
    let burger = document.querySelector('.header__burger')


    if (burger) {
      let nav = document.querySelector('.nav')

      burger.addEventListener('click', function () {
        this.classList.toggle('active')
        nav.classList.toggle('active')
      })
    }
  }
  burger()

  // Робимо акардеони для футера на мобілці.
  function accardeonsSite() {
    let footerLists = document.querySelectorAll('.footer-wrapper__column')

    footerLists.forEach(element => {
      if (window.matchMedia('(max-width: 767.98px)').matches) {
        element.classList.add('accardeons')
      } else {
        element.classList.remove('accardeons')
      }
    })

    let accardeons = document.querySelectorAll('.accardeons')

    if (accardeons.length > 0) {
      accardeons.forEach(accardeon => {
        let accardeonHeader = accardeon.querySelectorAll('.accardeons__header')

        if (accardeonHeader.length > 0) {
          accardeonHeader.forEach(header => {
            header.addEventListener('click', function () {
              let body = this.nextElementSibling
              let bodyHeight = body.scrollHeight

              if (this.classList.contains('active')) {
                this.classList.remove('active');
                body.classList.remove('active');
                body.style.height = `0px`;
              } else {
                removeClassActive();
                this.classList.add('active');
                body.classList.add('active');
                body.style.height = `${bodyHeight}px`;
              }
            });
          });

          // Видаляємо клас active в accardeonHeader.
          function removeClassActive() {
            accardeonHeader.forEach(header => {
              header.classList.remove('active');
              let body = header.nextElementSibling;
              if (body) {
                body.classList.remove('active');
                body.style.height = `0px`;
              }
            });
          }
        }
      });
    }
  }
  accardeonsSite()


  // Робимо щоб під списки можна було відкривати по табу, якщо сенсорний екран.
  function touchSubList() {
    let subListArrow = document.querySelectorAll('.sublist-item__arrow');
    let subLists = document.querySelectorAll('.sublist');

    if (subListArrow.length > 0) {
      subListArrow.forEach(arrow => {
        arrow.addEventListener('click', function () {

          let subList = this.nextElementSibling;

          if (subList.classList.contains('active')) {
            subList.classList.remove('active');
            this.classList.remove('active');
          } else {
            removeActiveSubMenusOnSameLevel(this);
            subList.classList.add('active');
            this.classList.add('active');
          }
        });

        function removeActiveSubMenusOnSameLevel(clickedArrow) {
          let siblings = Array.from(clickedArrow.parentElement.parentElement.children);

          siblings.forEach(sibling => {
            let subMenu = sibling.querySelector('.sublist');

            if (subMenu && subMenu !== clickedArrow.nextElementSibling) {
              subMenu.classList.remove('active');

            }
          });
        }
      });

      document.addEventListener('click', (e) => {
        if (!isDescendant(e.target, subLists) && !isDescendant(e.target, subListArrow)) {
          subLists.forEach(item => {
            if (item.classList.contains('active')) {
              item.classList.remove('active');
            }
          });
        }
      });
    }
  }

  function isDescendant(child, parentArray) {
    for (let parent of parentArray) {
      if (parent.contains(child)) {
        return true;
      }
    }
    return false;
  }

  touchSubList();








  // // Робимо активні попапи посайту.
  // function activePopap() {
  //     let popapBtn = document.querySelectorAll('.popap-btn')

  //     if(popapBtn.length > 0) {
  //         popapBtn.forEach(btn => {
  //             btn.addEventListener('click', function() {
  //                 let idPopap = this.dataset.id

  //                 if(idPopap) {
  //                     let popap = document.querySelector(`#${idPopap}`)

  //                     if(popap) {
  //                         popap.classList.add('active')

  //                         let btnClose = popap.querySelector('.popap__close')

  //                         popap.addEventListener('click', function(e) {
  //                             e.stopPropagation()
  //                         })

  //                         let popapShadow = popap.parentNode

  //                         if(popapShadow) {
  //                             popapShadow.classList.add('active')

  //                             popapShadow.addEventListener('click', popapHidden)
  //                             btnClose.addEventListener('click', popapHidden)

  //                             function popapHidden() {
  //                                 popapShadow.classList.remove('active')
  //                                 popap.classList.remove('active')
  //                             }
  //                         }
  //                     }
  //                 }
  //             })
  //         })
  //     }
  // } 
  // activePopap()


  // Робимо таби по сайту.
  function heandlerTabs() {
    let tabs = document.querySelectorAll(".tabs")

    if (tabs.length > 0) {
      tabs.forEach(tab => {
        let tabBtns = tab.querySelectorAll('.tabs__item')

        if (tabBtns.length > 0) {
          tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
              removeActive()
              this.classList.add('active')

              let index = this.dataset.tabIndex
              let body = tab.querySelector(`.tabs__body-${index}`)

              if (body) {
                body.classList.add('active')
              }
            })
          })
        }

        function removeActive() {
          let tabHeader = tab.querySelectorAll('.tabs__item')
          let tabBody = tab.querySelectorAll('.tabs__body')

          tabHeader.forEach(item => {
            item.classList.remove('active')
          })

          tabBody.forEach(item => {
            item.classList.remove('active')
          })
        }
      })
    }
  }
  heandlerTabs()

  // // При скролі додаємо класс для header щоб зафіксувати.
  // function fixedHeader() {
  //     let header = document.querySelector('.header')
  //     let headerHeight = header.clientHeight

  //     if(header) {
  //         let nextElement = header.nextElementSibling

  //         if(window.matchMedia("(min-width: 1023.98px)").matches) {
  //             document.addEventListener('scroll', function() {
  //                 if(window.scrollY > headerHeight) {
  //                     header.classList.add('fixed')
  //                     nextElement.style.marginTop = `${headerHeight}px`
  //                 } else {
  //                     header.classList.remove('fixed')
  //                     nextElement.style.marginTop = `0px`
  //                 }
  //             })
  //         }
  //     }
  // }
  // document.addEventListener('resize', fixedHeader())


  // Робимо плавну прокрутку до якорів.
  function goAnchor() {
    let btnAnchors = document.querySelector('.footer-bottom__go-top')


    if (btnAnchors) {
      btnAnchors.addEventListener('click', function (e) {
        e.preventDefault()

        window.scrollBy({
          top: -(window.scrollY),
          behavior: 'smooth'
        })
      })
    }
  }
  goAnchor()

  // // При скролі для відповідних елементів додаємо класс.
  // function heandlerScroll() {
  //   let elementsScroll = document.querySelectorAll('.scroll-element')
  //   let elementsAnimation = document.querySelectorAll('.animation')
  //   let sections = document.querySelectorAll('section')

  //   // if (elementsScroll.length > 0) {
  //   //   window.addEventListener('scroll', scrollActiveItem)

  //   //   function scrollActiveItem() {
  //   //     let scrollPosition = window.scrollY + (window.innerHeight / 2)

  //   //     sections.forEach(section => {
  //   //       let sectionTop = section.offsetTop

  //   //       if(scrollPosition >= sectionTop) {
  //   //         let sectionId = section.getAttribute('id')

  //   //         elementsScroll.forEach(item => {
  //   //           if (item.dataset.scrollId === sectionId) {
  //   //             item.classList.add('active')
  //   //           } else {
  //   //             item.classList.remove('active')
  //   //           }
  //   //         })
  //   //       }
  //   //     })
  //   //   }

  //   //   scrollActiveItem()
  //   // }

  //   // if (elementsAnimation.length > 0) {

  //   //   elementsAnimation.forEach(item => {

  //   //     const options = {
  //   //       rootMargin: '-200px',
  //   //       threshold: [0, 0.5]
  //   //     }
  //   //     const obsorver = new IntersectionObserver(function (entries, obsorver) {
  //   //       entries.forEach(entry => {
  //   //         if (entry.isIntersecting) {
  //   //           item.classList.add('active')
  //   //         }
  //   //       })
  //   //     }, options)

  //   //     obsorver.observe(item)
  //   //   })
  //   // }
  // }
  // heandlerScroll()

  // Переносимо елементи в потрібні блоки при адаптиві.
  function dynamicElementsTransfer() {
    const header = document.querySelector('.header')

    if (header) {

      const actonsBtnWrap = header.querySelector('.header-top-action__box-btn')
      const actonsWrap = header.querySelector('.header-top-action')
      const nav = header.querySelector('.nav')

      // Перекидаємо при адаптиві кнопки в бургер.
      if (actonsWrap && nav) {
        if (window.matchMedia("(max-width: 767.98px)").matches) {
          nav.insertBefore(actonsBtnWrap, nav.lastChild)
        } else {
          if (actonsWrap.querySelector('.header-top-action__box-btn') === null) {
            actonsWrap.insertBefore(actonsBtnWrap, actonsWrap.firstChild)
          }
        }
      }
    }
  }
  window.addEventListener('resize', dynamicElementsTransfer)
  dynamicElementsTransfer()


  // Получаємо data-color в елемента і задаємо для самого елементу.
  function addDataColor() {
    let dataColor = document.querySelectorAll('[data-color]')

    if (dataColor.length > 0) {
      dataColor.forEach(item => {
        let color = item.dataset.color

        if (color) {
          item.style.background = `${color}`
        }
      })
    }
  }
  addDataColor()

  // Робимо що можна було обрати продукт favorite.
  function activeFavorite() {
    let favorite = document.querySelectorAll('.product-card__favorite')

    if(favorite.length > 0) {
      favorite.forEach(item => {
        item.addEventListener('click', function() {
          this.classList.toggle('active')
        })
      })
    }
  }
  activeFavorite()
})
