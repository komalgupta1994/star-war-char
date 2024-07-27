import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import ListItem from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCharacter = {
    name: 'Luke Skywalker',
    hair_color: 'Blond',
    eye_color: 'Blue',
    homeworld: 'Tatooine',
    height: '172',
    gender: 'Male',
    films: [
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/2/'
    ]
};

const mockFilms = [
    { title: 'A New Hope', url: 'http://swapi.dev/api/films/1/' },
    { title: 'The Empire Strikes Back', url: 'http://swapi.dev/api/films/2/' }
];

describe('ListItem', () => {
    beforeEach(() => {
        mockedAxios.get.mockImplementation((url: string) => {
            if (url.includes('films')) {
                return Promise.resolve({ data: mockFilms.find(film => film.url === url) });
            }
            return Promise.resolve({ data: mockCharacter });
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders character details after loading', async () => {
        await act(async () => {
            render(<ListItem id="1" />);
        });

        await waitFor(() => {
            expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
            expect(screen.getByText('Blond')).toBeInTheDocument();
            expect(screen.getByText('Blue')).toBeInTheDocument();
            expect(screen.getByText('Tatooine')).toBeInTheDocument();
            expect(screen.getByText('172')).toBeInTheDocument();
            expect(screen.getByText('Male')).toBeInTheDocument();
        });
    });

    it('renders films list', async () => {
        await act(async () => {
            render(<ListItem id="1" />);
        });

        await waitFor(() => {
            expect(screen.getByText('A New Hope - http://swapi.dev/api/films/1/')).toBeInTheDocument();
            expect(screen.getByText('The Empire Strikes Back - http://swapi.dev/api/films/2/')).toBeInTheDocument();
        });
    });

    it('allows editing character details', async () => {
        await act(async () => {
            render(<ListItem id="1" />);
        });

        await waitFor(() => screen.getByText('Luke Skywalker'));

        fireEvent.click(screen.getByText('Edit'));

        fireEvent.change(screen.getByLabelText('Height:'), { target: { value: '180' } });
        fireEvent.change(screen.getByLabelText('Gender:'), { target: { value: 'female' } });

        fireEvent.click(screen.getByText('Save'));

        await act(async () => {
            await waitFor(() => {
                expect(screen.getByText('180')).toBeInTheDocument();
                expect(screen.getByText('female')).toBeInTheDocument();
            });
        });


    });

    it('cancels editing character details', async () => {
        await act(async () => {
            render(<ListItem id="1" />);
        });

        await waitFor(() => screen.getByText('Luke Skywalker'));

        fireEvent.click(screen.getByText('Edit'));

        fireEvent.change(screen.getByLabelText('Height:'), { target: { value: '180' } });
        fireEvent.change(screen.getByLabelText('Gender:'), { target: { value: 'Female' } });

        fireEvent.click(screen.getByText('Cancel'));

        expect(screen.queryByText('180')).not.toBeInTheDocument();
        expect(screen.queryByText('Female')).not.toBeInTheDocument();
    });
});

