const snapshotContainerNode = document.querySelector('.snapshot-container');
const snapshotContainerBackgroundNode = document.querySelector('.snapshot-container__background');
const terminalCodeSnippetNode = document.querySelector('.terminal__code-snippet');
const terminalNode = document.querySelector('.terminal');
const exportFormatNode = document.getElementById('export-format');

const resetStyles = () => {
    snapshotContainerNode.style.resize = '';
    terminalNode.style.resize = '';
}

export const takeSnapshot = () => {
    snapshotContainerNode.style.resize = 'none';
    terminalNode.style.resize = 'none';

    const options = {
        width: snapshotContainerBackgroundNode.offsetWidth * 2,
        height: snapshotContainerBackgroundNode.offsetHeight * 2,
        style: {
            transform: 'scale(2)',
            'transform-origin': 'center',
            background: '#e0eafc',
            background: 'linear-gradient(to left, #e0eafc, #cfdef3);'
        }
    };

    switch(exportFormatNode.value) {
        case 'png':
            domtoimage
                .toBlob(snapshotContainerBackgroundNode, options)
                .then(function(blob) {
                    resetStyles();
                    window.saveAs(blob, 'code-snapshot.png');
                });
            break;
        case 'svg':
            domtoimage
                .toSvg(snapshotContainerBackgroundNode, options)
                .then(function(dataUrl) {
                    resetStyles();
                    const link = document.createElement('a');
                    link.download = 'code-snapshot.svg';
                    link.href = dataUrl;
                    link.click();
                });
        case 'html':
            const link = document.createElement('a');
            link.download = 'code-snapshot.html';
            link.href = 'data:text/attachment;,' + encodeURIComponent(terminalCodeSnippetNode.innerHTML);
            link.click();
            resetStyles();
    }
};
