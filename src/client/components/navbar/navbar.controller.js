export default function navbar() {
    const loc = location.hash.split('/')[1].split('?')[0];
    switch (loc) {
        case 'about':
            $('#menu-about').addClass('active');
            console.log('about');
            break;
        case 'demo':
            $('#menu-demo').addClass('active');
            break;
        case '':
            $('#menu-blog').addClass('active');
            break;
    }
}
