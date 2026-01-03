function showError(message) {
	const errorElement = document.getElementById("error-message");
	errorElement.textContent = message;
	errorElement.classList.add("show");

	// Auto hide error after 3 seconds
	setTimeout(() => {
		errorElement.classList.remove("show");
	}, 3000);
}

function calculateAge() {
	// Get input elements
	const startDate = new Date(document.getElementById("start-date").value);
	const useCurrentDate = document.getElementById("use-current-date").checked;
	let endDate;

	if (useCurrentDate) {
		endDate = new Date();
	} else {
		const endDateValue = document.getElementById("end-date").value;
		if (!endDateValue) {
			showError("Please select end date");
			return;
		}
		endDate = new Date(endDateValue);
	}

	// Validate start date
	if (isNaN(startDate.getTime())) {
		showError("Please select birth date");
		return;
	}

	// Validate date range
	if (startDate > endDate) {
		showError("Birth date cannot be later than end date");
		return;
	}

	// Clear any existing error
	document.getElementById("error-message").classList.remove("show");

	// Calculate the difference
	let years = endDate.getFullYear() - startDate.getFullYear();
	let months = endDate.getMonth() - startDate.getMonth();
	let days = endDate.getDate() - startDate.getDate();

	// Adjust months and years if days are negative
	if (days < 0) {
		months--;
		// Get the last day of the previous month
		const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
		days += lastMonth.getDate();
	}

	// Adjust years if months are negative
	if (months < 0) {
		years--;
		months += 12;
	}

	// Animate the results
	animateNumber(document.getElementById("years"), years);
	animateNumber(document.getElementById("months"), months);
	animateNumber(document.getElementById("days"), days);
}

function animateNumber(element, target) {
	// Reset the element
	let current = 0;
	element.textContent = "0";

	// Create animation
	const interval = setInterval(() => {
		if (current >= target) {
			element.textContent = target;
			clearInterval(interval);
			return;
		}
		current++;
		element.textContent = current;
	}, 50);
}

// Handle toggle switch
document.addEventListener("DOMContentLoaded", function () {
	const endDateInput = document.getElementById("end-date");
	const useCurrentDate = document.getElementById("use-current-date");

	// Set initial state
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0");
	const dd = String(today.getDate()).padStart(2, "0");
	const currentDate = `${yyyy}-${mm}-${dd}`;

	endDateInput.value = currentDate;
	endDateInput.max = currentDate;

	// Toggle end date input
	useCurrentDate.addEventListener("change", function () {
		endDateInput.disabled = this.checked;
		if (this.checked) {
			endDateInput.value = currentDate;
			// Clear any existing error when switching to current date
			document.getElementById("error-message").classList.remove("show");
		}
	});

	// Initialize end date input state
	endDateInput.disabled = useCurrentDate.checked;
});