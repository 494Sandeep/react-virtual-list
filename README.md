# Frontend Technical Task: Advanced Editable Data Table

A high-performance React data table application with advanced filtering, sorting, editing capabilities, and support for large datasets (10,000+ rows) using both pagination and virtual scrolling.

## 🚀 Features

- **Inline Editing**: Edit employee data directly in the table with save/cancel actions
- **Advanced Filtering**: Real-time filtering across all fields (name, email, designation, salary, experience)
- **Dual View Modes**: Toggle between pagination and virtual scrolling for optimal performance
- **Sorting**: Click column headers to sort data in both view modes
- **CSV Export**: Export all data or filtered data to CSV files
- **Redux State Management**: Centralized state management with persistence
- **Performance Optimized**: Handles 10,000+ rows efficiently with virtual scrolling
- **Responsive Design**: Clean, modern UI using Material-UI components

## 📋 Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or extract the project**
   ```bash
   cd cloudeagle-virtual-table
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   *Note: The `--legacy-peer-deps` flag is required due to Redux version compatibility*

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000) in your browser
   - The application will automatically generate 10,000 sample employee records

## 🏗️ High-Level Approach and Decisions

### Architecture Decisions

**1. State Management - Redux**
- **Decision**: Used Redux with redux-persist for centralized state management
- **Rationale**: Complex filtering, sorting, and editing operations require shared state across components
- **Benefits**: Predictable state updates, time-travel debugging, persistent filters

**2. Performance Strategy - Dual Rendering Modes**
- **Decision**: Implemented both pagination and virtual scrolling options
- **Rationale**: Different use cases benefit from different approaches
  - **Pagination**: Better for smaller datasets, familiar UX, easier implementation
  - **Virtual Scrolling**: Essential for large datasets (10,000+ rows), smooth scrolling
- **Implementation**: react-window for virtual scrolling, Material-UI pagination for traditional mode

**3. Component Architecture - Separation of Concerns**
- **Decision**: Modular component structure with clear responsibilities
- **Structure**:
  - `Filters/`: Filtering UI and CSV export functionality
  - `Table/`: Main table component with mode switching logic
  - `VirtualTable/`: Dedicated virtual scrolling implementation
  - `store/`: Redux actions, reducers, and store configuration

**4. Filtering Strategy - Real-time Client-side**
- **Decision**: Implemented real-time filtering on the client side
- **Rationale**: Better user experience with immediate feedback
- **Implementation**: Redux state updates trigger automatic re-filtering

**5. Data Generation - Realistic Test Data**

### Technical Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: Redux 4.x with redux-persist
- **UI Framework**: Material-UI (MUI) v7
- **Virtual Scrolling**: react-window
- **Styling**: Material-UI theming with custom overrides
- **Build Tool**: Create React App

### Performance Optimizations

1. **Memoization**: Used React.useMemo for expensive sorting/filtering operations
2. **Virtual Scrolling**: Only renders visible rows (~10 at a time) for large datasets
3. **Efficient Selectors**: Redux selectors minimize unnecessary re-renders
4. **Debounced Operations**: Filtering operations are optimized to prevent excessive updates

## 🔧 Usage Guide

### Filtering
- Type in any filter field for real-time filtering
- Filters work across all fields: name, email, designation, salary, experience
- Use "Clear" button to reset all filters

### View Mode Toggle
- Use the switch in the Filters section to toggle between:
  - **Pagination**: Traditional table with page navigation
  - **Virtual Scrolling**: Smooth scrolling through large datasets

### Sorting
- Click any column header to sort (both modes support sorting)
- Click again to reverse sort order
- Sort indicators show current column and direction

### Editing
- Click "Edit" on any row to enable inline editing
- Modify values and click "Save" to confirm or "Cancel" to discard
- Changes are immediately reflected in Redux state

### CSV Export
- Click "Export CSV" button in the Filters section
- Choose between:
  - **Export All Data**: Downloads all 10,000 records
  - **Export Filtered Data**: Downloads only currently filtered records

## ⚠️ Known Limitations

### 1. Undo Functionality
- **Limitation**: No undo functionality for edit operations
- **Impact**: Users cannot revert changes after saving
- **Workaround**: Manual re-entry of previous values
- **Future Enhancement**: Implement Redux-based action history for undo/redo

### 2. Bulk Operations
- **Limitation**: No bulk edit or delete operations
- **Impact**: Users must edit records individually
- **Future Enhancement**: Add row selection and bulk action capabilities

### 3. Server-side Operations
- **Limitation**: All operations are client-side only
- **Impact**: No persistence beyond browser session (except Redux persist)
- **Future Enhancement**: Integrate with backend API for true data persistence

### 4. Advanced Filtering
- **Limitation**: Basic text/number matching only
- **Impact**: No date ranges, regex, or complex query support
- **Future Enhancement**: Add advanced filter operators and date pickers

### 5. Mobile Responsiveness
- **Limitation**: Optimized primarily for desktop use
- **Impact**: May not provide optimal experience on small screens
- **Future Enhancement**: Implement responsive design patterns for mobile

### 6. Accessibility
- **Limitation**: Basic accessibility support
- **Impact**: May not meet all WCAG guidelines
- **Future Enhancement**: Add comprehensive ARIA labels and keyboard navigation

## 🧪 Testing

To run the test suite:
```bash
npm test
```

## 🏗️ Building for Production

To create a production build:
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── @type/           # TypeScript type definitions
├── components/       # React components
│   ├── Filters/     # Filtering and export functionality
│   └── Table/       # Table components (regular and virtual)
├── store/           # Redux store configuration
│   └── employee/    # Employee-related actions and reducers
├── utils/           # Utility functions and data generation
└── theme.tsx        # Material-UI theme configuration
```

## 🤝 Contributing

This project was created as a technical demonstration. For production use, consider implementing the suggested enhancements in the Known Limitations section.
