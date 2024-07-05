import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subDepartments?: Department[];
}

const departments: Department[] = [
  {
    id: 1,
    name: 'Agriculture & Fishing',
    subDepartments: [
      { id: 2, name: 'Agriculture' },
      { id: 3, name: 'Crops' },
      { id: 4, name: 'Farming Animals & Livestock' },
      { id: 5, name: 'Fishery & Aquaculture' },
      { id: 6, name: 'Ranching' }
    ]
  },
  {
    id: 7,
    name: 'Business Services',
    subDepartments: [
      { id: 8, name: 'Accounting & Accounting Services' },
      { id: 9, name: 'Auctions' },
      { id: 10, name: 'Business Services - General' },
      { id: 11, name: 'Call Centers & Business Centers' },
      { id: 12, name: 'Career Planning' },
      { id: 13, name: 'Career' },
      { id: 14, name: 'Commercial Printing' },
      { id: 15, name: 'Debt Collection' }
    ]
  }
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

  const handleClick = (id: number) => {
    setOpen(prevOpen => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  const handleSelect = (id: number, subDepartments?: Department[]) => {
    const isSelected = !selected[id];
    const updatedSelected = { ...selected, [id]: isSelected };

    if (subDepartments) {
      subDepartments.forEach(sub => {
        updatedSelected[sub.id] = isSelected;
      });
    } else {
      const parent = departments.find(dep => dep.subDepartments?.some(sub => sub.id === id));
      if (parent) {
        const allSelected = parent.subDepartments?.every(sub => updatedSelected[sub.id]);
        updatedSelected[parent.id] = allSelected || false;
      }
    }

    setSelected(updatedSelected);
  };

  const renderDepartments = (deps: Department[]) => {
    return deps.map(dep => (
      <React.Fragment key={dep.id}>
        <ListItem button onClick={() => handleClick(dep.id)}>
          <Checkbox
            checked={selected[dep.id] || false}
            onChange={() => handleSelect(dep.id, dep.subDepartments)}
          />
          <ListItemText primary={dep.name} />
          {dep.subDepartments ? (open[dep.id] ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItem>
        {dep.subDepartments && (
          <Collapse in={open[dep.id]} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 4 }}>
              <List component="div" disablePadding>
                {renderDepartments(dep.subDepartments)}
              </List>
            </Box>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <List>
      {renderDepartments(departments)}
    </List>
  );
};

export default DepartmentList;
