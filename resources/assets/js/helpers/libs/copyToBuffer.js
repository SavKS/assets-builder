export default text => {
    const input = document.createElement('input');

    input.value = text;

    input.style.position = 'absolute';
    input.style.transform = 'translate(-10000px,-10000px)';

    document.body.append(input);

    input.select();

    document.execCommand('copy');

    document.body.removeChild(input);
};
