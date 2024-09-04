$(document).ready(function () {
    const cartList = [
        {
            itemId: 'item-1',
            title: 'Chinese Quince',
            price: '$200.00',
            img: 'images/bestseller/img1.png'
        },
        {
            itemId: 'item-2',
            title: 'Attractive Peperomia',
            price: '$100.00',
            img: 'images/bestseller/img1.png'
        },
        {
            itemId: 'item-3',
            title: 'Acoma Crape Myrtle',
            price: '$200.00',
            img: 'images/bestseller/img2.png'
        },
        {
            itemId: 'item-4',
            title: 'Black-Eyed Susan Vine',
            price: '$120.00',
            img: 'images/bestseller/img3.png'
        },
        {
            itemId: 'item-5',
            title: 'Acoma Crape Myrtle',
            price: '$170.00',
            img: 'images/bestseller/img4.png'
        },
        {
            itemId: 'item-6',
            title: 'Good Luck Plants',
            price: '$70.00',
            img: 'images/bestseller/img5.png'
        },
        {
            itemId: 'item-7',
            title: 'house Parlor Palm',
            price: '$130.00',
            img: 'images/bestseller/img6.png'
        },
    ];

    $(".add-to-cart-btn").click(function (e) {
        $('#cart-item-title').html('');
        $('#cart-item-price').html('');
        let x = $(this).attr('alt');
        console.log('===', x)
        cartList.forEach((e) => {
            if (e.itemId == x) {
                $('#cart-item-title').html(e.title);
                $('#cart-item-price').html(e.price);
                $('#cart-item-img').attr('src', e.img);
            }
        })

    })

});