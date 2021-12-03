import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>);

    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const address = screen.getByLabelText(/address/i);
    const city = screen.getByLabelText(/city/i);
    const state = screen.getByLabelText(/state/i);
    const zip = screen.getByLabelText(/zip/i);
    const button = screen.getByRole("button")

    userEvent.type(firstName, "Hannah");
    userEvent.type(lastName, "Brog");
    userEvent.type(address, "1400 Stump Creek Road");
    userEvent.type(city, "Auburn");
    userEvent.type(state, "Wyoming");
    userEvent.type(zip, "83111");
    userEvent.click(button);

    await waitFor(() => {
        const fN = screen.queryByText(/first name/i);
        const lN = screen.queryByText(/last name/i);
        const aD = screen.queryByText(/address/i);
        const cI = screen.queryByText(/city/i);
        const sT = screen.queryByText(/state/i);
        const zP = screen.queryByText(/zip/i);
        const message = screen.queryByText(/You have ordered some plants! Woo-hoo!/i)

        expect(fN).toBeInTheDocument();
        expect(lN).toBeInTheDocument();
        expect(aD).toBeInTheDocument();
        expect(cI).toBeInTheDocument();
        expect(sT).toBeInTheDocument();
        expect(zP).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    })
});
