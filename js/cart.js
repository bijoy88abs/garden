$(document).ready(function () {
    let cartBuyValue = 0;
    const cartList = [
        {
            itemId: 'item-1',
            title: 'Chinese Quince',
            price: '$200.00',
            img: 'images/bestseller/img1.png',
            addedToCart: false,
        },
        {
            itemId: 'item-2',
            title: 'Attractive Peperomia',
            price: '$100.00',
            img: 'images/bestseller/img2.png',
            addedToCart: false,
        },
        {
            itemId: 'item-3',
            title: 'Acoma Crape Myrtle',
            price: '$200.00',
            img: 'images/bestseller/img3.png',
            addedToCart: false,
        },
        {
            itemId: 'item-4',
            title: 'Black-Eyed Susan Vine',
            price: '$120.00',
            img: 'images/bestseller/img4.png',
            addedToCart: false,
        },
        {
            itemId: 'item-5',
            title: 'Acoma Crape Myrtle',
            price: '$170.00',
            img: 'images/bestseller/img5.png',
            addedToCart: false,
        },
        {
            itemId: 'item-6',
            title: 'Good Luck Plants',
            price: '$70.00',
            img: 'images/bestseller/img6.png',
            addedToCart: false,
        },
        {
            itemId: 'item-7',
            title: 'house Parlor Palm',
            price: '$130.00',
            img: 'images/bestseller/img7.png',
            addedToCart: false,
        },
    ];

    setTimeout(() => {
        let retrievedObject = JSON.parse(sessionStorage.getItem('cartObject'));
        if (!retrievedObject) {
            sessionStorage.setItem('cartObject', JSON.stringify(cartList));
        }
        checkCartItems();
    }, 100);

    $(".item-cart-icons").click(function (e) {
        let selectedCartClass = $(this).attr('alt');
        let selectedIdSplit = selectedCartClass.split("-");
        let selectedId = `${selectedIdSplit[0]}-${selectedIdSplit[1]}`;
        if (selectedId) {
            let findObj = retrievedObject.find((i) => i.itemId == selectedId);
            if (findObj) {
                const newList = [];

                retrievedObject.forEach((e) => {
                    if (e.itemId == selectedId) {
                        newList.push({
                            itemId: e.itemId,
                            title: e.title,
                            price: e.price,
                            img: e.img,
                            addedToCart: true,
                        });
                    } else {
                        newList.push(e);
                    }
                });
                $('#addedToCartModal').modal('show');
                sessionStorage.removeItem('cartObject');
                sessionStorage.setItem('cartObject', JSON.stringify(newList));
                checkCartItems();
            }
        }
    });

    $(".item-cart-icons-del").click(function (e) {
        let selectedCartClass = $(this).attr('alt');
        let selectedIdSplit = selectedCartClass.split("-");
        let selectedId = `${selectedIdSplit[0]}-${selectedIdSplit[1]}`;
        console.log(selectedId)
        if (selectedId) {
            let findObj = retrievedObject.find((i) => i.itemId == selectedId);
            if (findObj) {
                const newList = [];
                retrievedObject.forEach((e) => {
                    if (e.itemId == selectedId) {
                        newList.push({
                            itemId: e.itemId,
                            title: e.title,
                            price: e.price,
                            img: e.img,
                            addedToCart: false,
                        });
                    } else {
                        newList.push(e);
                    }
                });
                sessionStorage.removeItem('cartObject');
                sessionStorage.setItem('cartObject', JSON.stringify(newList));
                checkCartItems();
            }
        }
    });

    $(".add-to-order-btn").click(function (e) {
        $('#cart-item-title').html('');
        $('#cart-item-price').html('');
        $("#option-buy-quantity").val(1);
        let x = $(this).attr('alt');
        cartBuyValue = 0;
        retrievedObject.forEach((e) => {
            if (e.itemId == x) {
                let y = $("#option-buy-quantity").val();
                const z = parseFloat(e.price.substring(1)) * parseInt(y);
                cartBuyValue = parseFloat(e.price.substring(1));
                $('#cart-item-title').html(e.title);
                $('#cart-item-price').html(`$${z}.00`);
                $('#cart-item-img').attr('src', e.img);
                $('#cart-item-img2').attr('src', e.img);
            }
        });
    });

    $("#option-buy-quantity").change(function (e) {
        let y = $("#option-buy-quantity").val();
        const z = parseFloat(cartBuyValue) * parseInt(y);
        $('#cart-item-price').html(`$${z}.00`);

    });




    $("#cart-count-sec").click(function (e) {
        window.location.href = 'cart.html';
    });

    $("#modal-checkout").click(function (e) {
        let errorCount = 0;
        let name = $("#name").val();
        let email = $("#email").val();
        let mobile = $("#mobile").val();
        let address = $("#address").val();

        if (name == '') {
            alert('Please Enter a valid name');
            errorCount++;
            return;
        }
        if (email == '') {
            alert('Please Enter a valid email');
            errorCount++;
            return;
        }
        if (mobile == '') {
            alert('Please Enter a valid mobile');
            errorCount++;
            return;
        }
        if (address == '') {
            alert('Please Enter a valid address');
            errorCount++;
            return;
        }
        if (errorCount == 0) {
            $('#exampleModal3').modal('hide');
            $('#exampleModal4').modal('show');
        }
    });


    function checkCartItems() {
        setTimeout(() => {
            retrievedObject = JSON.parse(sessionStorage.getItem('cartObject'));
            let cartCount = 0;
            let cartPrice = 0.00;

            retrievedObject.forEach((e) => {
                const createIdLabel = `${e.itemId}-cart-label`;
                const createIdCart = `${e.itemId}-cart-icon`;
                const createIdCartDel = `${e.itemId}-cart-icon-del`;
                $("." + createIdCart).hide();
                $("." + createIdCartDel).hide();
                if (e.addedToCart) {
                    cartCount++;
                    cartPrice = parseFloat(cartPrice) + parseFloat(e.price.substring(1));
                    $("." + createIdLabel).html('Item added');
                    $("." + createIdLabel).addClass('cart-active');
                    $("." + createIdCartDel).show();
                } else {
                    $("." + createIdLabel).html('Add to cart');
                    $("." + createIdCart).show();
                    $("." + createIdLabel).removeClass('cart-active');
                }
            });
            $(".cart-count").html(cartCount);
            $(".cart-value").html(`$${cartPrice}.00`);
        }, 100);
    }

});