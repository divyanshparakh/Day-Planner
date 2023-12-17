import React, { useState } from "react";
import './Sidebar.scss';

function Sidebar({ email }) {
    const [imageSrc, setimageSrc] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACzElEQVR4nO2aTWsTURSGXwU/FpUu3RXaqmBtQqnjDMSKRYMW6ULwB6g7BVvwN2g/rAjJoqtkaWzRutBi24hgk42g2BmdrnUTbdFmWldBsL1y9AbSJpm0nY8kzXngEJi5d3LeM/ec3MMNwDAMwzAMwzCOCZlr7ZqeTam6lfv3aay2olHQFn4dVw0roxmWyJtqZOfRqOI1CoBu5dCo4rW9tAJUY7W1MLcp1yuLtzL5cXWPamTnt4rTFrJX7MRTcPLz317/evjVrU/x5KCZfX13UbhhcwOmiCvpIospqW8xJTX6tGPxoHsB0K1cKaHbEU/M3DZiWwV8efNTbKxviFLQdbpvF4CXN/WSASgIxKhnK0DbgXhiduBz0Zv/83td2EH37QKQuPTOPgCn00uuBSBkrrWXW+6VxBNzg+aKmyvg2bUPtuL/ByCVgZtoFQpeOfHE5NX30Rc3dDF7x3SU87TsK735AhtxNQBlg6BbS9rHlZOwgQoS5SQVqG06v2vzpAjabXf3zE8dwziHu0GDu0HB3aDB3aDgbtDYvDOkTUlcST2IK+nvdbkRUh12g+SQ18JruhuM+/Dma7objPnQA9R0NxirQgpwN9jB3SDD+E2IzwYtPhvU+GzQ4rNBjc8GLe4GscOt8Hh3UowFp8RwYEIMdSZ2bSOBCfEw+FxEuqYf1U03GOmadiS6lN3vfPKjLrrB8e6k6+LJ7p16vIx66AbHglOeBGA4OBlxNQBenQ06zfmipR9ILA8FJqLRYzOH4AUhPhtkGIZhGIbZxAEAzQCOAmgBcAJAAMAZAD0AzgHoBXABQBjAZQB9APql9clrYTmmV87pkc8IyGe2yO9olt9ZNY4AoH+HqdLp/ipZWPpAvjT5IXw/AKWKgiuZIn1s6ADsgw80AWiT+VnNFLgofWjzKwVQBrsieFYWtPOywJHT5Yog3aMxNJbm0FxPi+Bf719KK8eHnXUAAAAASUVORK5CYII=');
    const getElement = () => {
        return document.getElementById('calendar');
    }

    const getIcon = () => {
        const element = getElement();
        if(element === null || element.style.display === 'none')
            setimageSrc("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC90lEQVR4nO2aT0gUYRjGnw7t0VsHwy5dFrPcpHUH/AtBpuExgrpJHSvL7SRIZLeIoIXqEt46RBKOSthqEBr0x5HdcGJRWS9FoDGrrh60cr747JucanE3Z+dPO+8DDwyzOzPf8/u+951hGIBEIpFIJBKJRCKRSKScun473dDXk1oY7lL1+FWV7cYjl6bZw/C47X5QP6HfPKt87uxOnUQxdOPOTONgdPfBDQ92JBwBYPhe0yv9YrcasQygrye1wAOM984wbWaNbX7XmSG+PT+6WBCARy1vHAXA3XtO+WgZwLBY9trsGsulb+ubecP3n1YcD899v2FCtwwgzkN0qb/NvCF9hxUwcnmaDXYkXZl5s8HYHssARrvU7dA6czUQAQjTCmBUAmEHe0A0ndWvza8yowd+1RmTkhlPu/b1J1bzXGWhIaU4AKLzq+zF0gZb39RZfGnD9YA7+djLORaSJ3+5aACiJnt55s3hfQeghi97PwMIDSk+ByBPOg8gODbLAncHWCA2sLX956CM33HrcVGd63quAAjEtsMFYvJfAPi+Yoc3QyAASS+UQIyXgMyCY3O5S8CGVfDzei6UQGfa503w/GzW3wDa1GX/AjiTWnE9pOMArqSz+oW5rKdn3lYAUkLT3Q7maQDBUn8SlPIAKPknQYkAaPlLoJSfBCVqgtp/cReITC36dwVEphZZTfxD6QOoNb3uzhXWHgDJzIrbwXO97i7IA+/WLIXnkpLaUy++7i7IQ5PPYFXh91+CkYSW8drr7nyulpXlkPy2yjIArvC0dkBKZJ5EEpmsGwD+peb5sq+WleEj/RMHtwZPIpFIJBLJLgUAlAHYB6ACAL/3VgI4CoB/ptoAoBFAM4Djwi0A+He8rQDahVvFvhbT/5rFsY3iXPych8Q1KsQ1y8QYHNFeAOUADgOoE4Nt94g5vHoxtv12QKkE0OaBoIX6lIDhawBVsKkEqjxaAnVi1sud7AuBAptgk6m5nSiwCfJj+LH8HEYT5OcuahP8AUW7z8QxIB5aAAAAAElFTkSuQmCC");
        else
            setimageSrc("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACzElEQVR4nO2aTWsTURSGXwU/FpUu3RXaqmBtQqnjDMSKRYMW6ULwB6g7BVvwN2g/rAjJoqtkaWzRutBi24hgk42g2BmdrnUTbdFmWldBsL1y9AbSJpm0nY8kzXngEJi5d3LeM/ec3MMNwDAMwzAMwzCOCZlr7ZqeTam6lfv3aay2olHQFn4dVw0roxmWyJtqZOfRqOI1CoBu5dCo4rW9tAJUY7W1MLcp1yuLtzL5cXWPamTnt4rTFrJX7MRTcPLz317/evjVrU/x5KCZfX13UbhhcwOmiCvpIospqW8xJTX6tGPxoHsB0K1cKaHbEU/M3DZiWwV8efNTbKxviFLQdbpvF4CXN/WSASgIxKhnK0DbgXhiduBz0Zv/83td2EH37QKQuPTOPgCn00uuBSBkrrWXW+6VxBNzg+aKmyvg2bUPtuL/ByCVgZtoFQpeOfHE5NX30Rc3dDF7x3SU87TsK735AhtxNQBlg6BbS9rHlZOwgQoS5SQVqG06v2vzpAjabXf3zE8dwziHu0GDu0HB3aDB3aDgbtDYvDOkTUlcST2IK+nvdbkRUh12g+SQ18JruhuM+/Dma7objPnQA9R0NxirQgpwN9jB3SDD+E2IzwYtPhvU+GzQ4rNBjc8GLe4GscOt8Hh3UowFp8RwYEIMdSZ2bSOBCfEw+FxEuqYf1U03GOmadiS6lN3vfPKjLrrB8e6k6+LJ7p16vIx66AbHglOeBGA4OBlxNQBenQ06zfmipR9ILA8FJqLRYzOH4AUhPhtkGIZhGIbZxAEAzQCOAmgBcAJAAMAZAD0AzgHoBXABQBjAZQB9APql9clrYTmmV87pkc8IyGe2yO9olt9ZNY4AoH+HqdLp/ipZWPpAvjT5IXw/AKWKgiuZIn1s6ADsgw80AWiT+VnNFLgofWjzKwVQBrsieFYWtPOywJHT5Yog3aMxNJbm0FxPi+Bf719KK8eHnXUAAAAASUVORK5CYII=");
    }

    const showHide = () => {
        const element = getElement();
        if(element.style.display === 'none')
            element.style.display='block';
        else
            element.style.display='none';
        getIcon();
    }
    
    return (
        <div className="sidebar">
            <img src={`https://robohash.org/${email}`} alt={email} title={email} class="profile-pic" height="45" width="45"></img>
            <div>&nbsp;</div>
            <button onClick={() => {showHide()}}>
                <img src={imageSrc} />
            </button>
        </div>
    )
}

export default Sidebar;