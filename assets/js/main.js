// preloader
(function () {
    document.body.onload = function () {
        setTimeout(function () {
            let preloader = document.getElementById('load');
            if (!preloader.classList.contains('success')) {
                preloader.classList.add('success');
            }
        }, 1500)
    }
})();

//  myLib
(function () {
    window.myLib = {};

    window.myLib.body = document.querySelector('body');

    window.myLib.closestAttr = function (item, attr) {
        var node = item;

        while (node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.toggleScroll = function () {
        myLib.body.classList.toggle('noScroll');
    };
})();

// header
(function () {
    var headerPage = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 0) {
            headerPage.classList.add('isActive');
        } else {
            headerPage.classList.remove('isActive')
        }
    })

})();

// activeScroll
(function () {
    window.myLib = {};

    window.myLib.body = document.querySelector('body');

    window.myLib.closestAttr = function (item, attr) {
        var node = item;

        while (node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.toggleScroll = function () {
        myLib.body.classList.toggle('noScroll');
    };
})();

// animate
(function () {
    const animItems = document.querySelectorAll('.animItems');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);

        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                // получаю высоту моего объекта
                const animItemHeight = animItem.offsetHeight;
                // получаею позицию моего объекта относительно высоты
                const animItemOffset = offset(animItem).top;
                // коэфициент регулировки анимации
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                // если мы прокрутили больше чем позиция объекта, но меньше чем его высота, то добавляем класс актив
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('activeAnim');
                } else {
                    // если есть класс animNoActiv,то класс актив убираться не будет
                    if (!animItem.classList.contains('animNoActiv')) {
                        animItem.classList.remove('activeAnim');
                    }

                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + screenLeft
            }
        }

        // задержка функции 
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }
})();

// popup
(function () {
    var showPopup = function (target) {
        target.classList.add('isActivePopup');
    };

    var closePopup = function (target) {
        target.classList.remove('isActivePopup');
    };

    myLib.body.addEventListener('click', function (e) {
        var target = e.target;
        var popupClass = myLib.closestAttr(target, 'data-popup');

        if (popupClass === null) {
            return;
        }

        e.preventDefault();
        var popup = document.querySelector('.' + popupClass);

        if (popup) {
            showPopup(popup);
            myLib.toggleScroll();
        }
    });

    myLib.body.addEventListener('click', function (e) {
        var target = e.target;

        if (target.classList.contains('btnClose') ||
            target.classList.contains('popupInner')) {
            var popup = myLib.closestItemByClass(target, 'popup');

            closePopup(popup);
            myLib.toggleScroll();
        }
    });

    myLib.body.addEventListener('keydown', function (e) {
        if (e.keyCode !== 27) {
            return;
        }

        var popup = document.querySelector('.popup.isActivePopup');

        if (popup) {
            closePopup(popup);
            myLib.toggleScroll();
        }
    });
})();

// slider
(function () {
    const slides = document.querySelectorAll(".sliderItem");
    const activeClass = "visibleItem";
    let index = 0;

    setInterval(() => {
        slides[index].classList.remove(activeClass);

        index++;

        if (index + 1 > slides.length) {
            index = 0;
        }

        slides[index].classList.add(activeClass);
    }, 3000);
})();

// catalog
(function () {
    var catalogSection = document.querySelector('.catalog');

    if (catalogSection === null) {
        return;
    }

    var removeChildren = function (item) {
        while (item.firstChild) {
            item.removeChild(item.firstChild);
        }
    };

    var updateChildren = function (item, children) {
        removeChildren(item);
        for (var i = 0; i < children.length; i += 1) {
            item.appendChild(children[i]);
        }
    };

    var catalog = catalogSection.querySelector('.menu');
    var catalogNav = catalogSection.querySelector('.catalogNav');
    var catalogItems = catalogSection.querySelectorAll('.menuItem');

    catalogNav.addEventListener('click', function (e) {
        // находим элемент по которому кликнули
        var target = e.target;
        //   находим ближайший класс у которого класс catalogNavBtn
        var item = myLib.closestItemByClass(target, 'catalogNavBtn');
        //   если item равен null или item содержит класс activeBtn то скрипт не выполняется
        if (item === null || item.classList.contains('activeBtn')) {
            return;
        }

        //  отменяем действие браузера по умолчанию
        e.preventDefault();
        // считаываем data-filter у элемента
        var filterValue = item.getAttribute('data-filter');
        // получаем кнопку которая была активна
        var previousBtnActive = catalogNav.querySelector('.catalogNavBtn.activeBtn');
        // у этой кнопки убираем класс activeBtn
        previousBtnActive.classList.remove('activeBtn');
        // к текущей кнопки добавляем класс activeBtn
        item.classList.add('activeBtn');

        if (filterValue === 'all') {
            updateChildren(catalog, catalogItems);
            return;
        }

        var filteredItems = [];
        for (var i = 0; i < catalogItems.length; i += 1) {
            var current = catalogItems[i];
            if (current.getAttribute('data-category') === filterValue) {
                filteredItems.push(current);
            }
        }

        updateChildren(catalog, filteredItems);
    });
})();

// product
(function () {
    var catalog = document.querySelector('.menu');

    if (catalog === null) {
        return;
    }

    var updateProductPrice = function (product, price) {
        var productPrice = product.querySelector('.priceValue');
        productPrice.textContent = price;
    };

    var changeProductSize = function (target) {
        var product = myLib.closestItemByClass(target, 'product');
        var previousBtnActive = product.querySelector('.sizeSelect.activeBtn');
        var newPrice = target.getAttribute('data-product-size-price');

        previousBtnActive.classList.remove('activeBtn');
        target.classList.add('activeBtn');
        updateProductPrice(product, newPrice);
    };

    var changeProductOrderInfo = function (target) {
        var product = myLib.closestItemByClass(target, 'product');
        var order = document.querySelector('.popupOrder');

        var productTitle = product.querySelector('.productTitle').textContent;
        var productSize = product.querySelector('.sizeSelect.activeBtn').textContent;
        var productPrice = product.querySelector('.priceValue').textContent;
        var productImgSrc = product.querySelector('.productImg').getAttribute('src');

        order.querySelector('.orderInfoTitle').setAttribute('value', productTitle);
        order.querySelector('.orderInfoSize').setAttribute('value', productSize);
        order.querySelector('.orderInfoPrice').setAttribute('value', productPrice);

        order.querySelector('.orderProductTitle').textContent = productTitle;
        order.querySelector('.orderProductPrice').textContent = productPrice;
        order.querySelector('.orderSize').textContent = productSize;
        order.querySelector('.orderImg').setAttribute('src', productImgSrc);
    };

    catalog.addEventListener('click', function (e) {
        var target = e.target;

        if (target.classList.contains('sizeSelect') && !target.classList.contains('activeBtn')) {
            e.preventDefault();
            changeProductSize(target);
        }

        if (target.classList.contains('productBtn')) {
            e.preventDefault();
            changeProductOrderInfo(target);
        }
    });
})();

// form
(function() {
    var forms = document.querySelectorAll('.formSend');

    if (forms.length === 0) {
      return;
    }

    var serialize = function(form) {
      var items = form.querySelectorAll('input, select, textarea');
      var str = '';
      for (var i = 0; i < items.length; i += 1) {
        var item = items[i];
        var name = item.name;
        var value = item.value;
        var separator = i === 0 ? '' : '&';

        if (value) {
          str += separator + name + '=' + value;
        }
      }
      return str;
    };

    var formSend = function(form) {
      var data = serialize(form);
      var xhr = new XMLHttpRequest();
      var url = 'mail.php';

      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onload = function() {
        var activePopup = document.querySelector('.popup.isActive');

        if (activePopup) {
          activePopup.classList.remove('isActive');
        } else {
          myLib.toggleScroll();
        }

        if (xhr.response === 'success') {
          document.querySelector('.popupThanks').classList.add('isActive');
        } else {
          document.querySelector('.popupError').classList.add('isActive');
        }

        form.reset();
      };

      xhr.send(data);
    };

    for (var i = 0; i < forms.length; i += 1) {
      forms[i].addEventListener('submit', function(e) {
        e.preventDefault();
        var form = e.currentTarget;
        formSend(form);
      });
    }
  })();

// accordeon
(function () {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("activeAcc");

            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

})();

// tab 
function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activeTab", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " activeTab";
};