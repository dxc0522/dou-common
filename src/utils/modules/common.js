export function downFile(url) {
    const aDom = document.createElement('a');
    const fileName = url.substring(
        url.lastIndexOf('/') + 1,
        url.includes('?') ? url.indexOf('?') : undefined
    );
    aDom.target = '_blank';
    aDom.style.display = 'none';
    aDom.href = url + '?attname=' + fileName;
    aDom.download = fileName;
    document.body.appendChild(aDom);
    aDom.click();
    document.body.removeChild(aDom);
}