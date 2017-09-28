import blogHeaderController from './blogHeader.controller';
import blogHead from './blogHeader.html';
import './blogHeader.style.scss';

const blogHeaderComponent = {
    template: blogHead,
    controller: blogHeaderController,
    bindings: {
        'data': '<',
    },
};

export default blogHeaderComponent;
