import { handleAddImage } from './addImage.js';
import { switchTheme } from './changeTheme.js';
import { renderTableContent } from './renderTableContent.js';

const defaultBtnActive = () => {
    defaultBtn.click();
};

switchTheme();
handleAddImage();
renderTableContent();
