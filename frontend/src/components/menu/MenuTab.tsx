import React, { useState } from 'react'
import { useStyles } from './MenuTab.styles'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuDishes from './MenuDishes';
import { getCategories, getItems } from '../../services/Menu.service';





function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function MenuTab(props: any) {
    const [value] = React.useState(0);
    const [categories, setCategories] = React.useState<Array<any>>([])
    const [items, setItems] = React.useState<Array<any>>([])
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<number>(0)
    const [selectedItems, setSelectedItems] = useState<any>()
    const [loadingMenu, setLoadingMenu] = useState<boolean>(true);
    const classes = useStyles();


    React.useEffect(() => {
        getCategories().then(response => {
            if (response) {
                let sortedData = response.data.sort(function (a: any, b: any) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                });
                setCategories(sortedData)
            }
        })
        getItems().then(response => {
            if (response) {
                setItems(response.data)
                const selectedItems = response.data.filter((item: any) => item.category.id === selectedCategoryIndex + 1)
                setSelectedItems(selectedItems)

                setLoadingMenu(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedCategoryIndex(newValue);
        const selectedItems = items.filter(item => item.category.id === newValue + 1)
        setSelectedItems(selectedItems)
    };

    const generateTabs = () => {
        return (
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {categories.map((category, categoryIndex) => {

                    return (
                        <Tab label={category.name} {...a11yProps(categoryIndex)} />
                    )
                })}
            </Tabs>
        )
    }


    return (
        <div className={classes.root}>
            {generateTabs()}
            <MenuDishes loadingMenu={loadingMenu} data={selectedItems} items={items} value={value} />
        </div>
    )
}
