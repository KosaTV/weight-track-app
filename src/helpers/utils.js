const getBase64Data = file => {
	const img = imgInput.value.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(img);

	reader.onload = () => {
		newImage.value = reader.result;
	};
};

export {getBase64Data};
