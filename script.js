
let contacts = [

];

const contactList = document.getElementById('contact-list');
const addContactBtn = document.getElementById('add-contact-btn');
const contactModal = document.getElementById('contact-modal');
const saveContactBtn = document.getElementById('save-contact-btn');
const closeModalBtn = document.querySelector('.close');
let isEditMode = false;
let currentContactId = null;
function displayContacts() {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Phone: ${contact.phone}</p>
            <button class="edit-btn" onclick="editContact(${contact.id})" id="edit">Edit</button>
            <button class="delete-btn" onclick="deleteContact(${contact.id})"id="delete">Delete</button>
        `;
        contactList.appendChild(contactItem);
    });
}
function openModal() {
    document.getElementById('modal-title').innerText = 'Add Contact';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    contactModal.style.display = 'block';
    isEditMode = false;
}
function closeModal() {
    contactModal.style.display = 'none';
}

function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    if (name && phone) {
        const newContact = {
            id: generateContactId(),
            name: name,
            phone: phone
        };
        contacts.push(newContact);
        closeModal();
        displayContacts();
    }
}
function generateContactId() {
    return contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
}
function editContact(id) {
    const contact = contacts.find(contact => contact.id === id);
    document.getElementById('modal-title').innerText = 'Edit Contact';
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    currentContactId = id;
    isEditMode = true;
    contactModal.style.display = 'block';
}
function updateContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const index = contacts.findIndex(contact => contact.id === currentContactId);
    if (index !== -1 && name && phone) {
        contacts[index].name = name;
        contacts[index].phone = phone;
        closeModal();
        displayContacts();
    }
}
function deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact?")) {
        contacts = contacts.filter(contact => contact.id !== id);
        displayContacts();
    }
}
addContactBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
    if (event.target == contactModal) {
        closeModal();
    }
});
saveContactBtn.addEventListener('click', function() {
    if (isEditMode) {
        updateContact();
    } else {
        addContact();
    }
});
displayContacts();

