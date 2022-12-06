<script setup lang="ts">
import { NavItemData, UserInfo } from '~/constants/types';
import { leftNavItemData, unAuthenticatedNavItem } from '~/constants/navItemData';

    const route = useRoute();
    const isAuthenticated = useAuthenticated();
    const user = useUser();

    const rightNavItemData = ref<NavItemData[] | null>(unAuthenticatedNavItem);

    const usersEndPoint = useApi('users');
    const { data } = await usersEndPoint.get('profile');
    if (data.value) {
        rightNavItemData.value = [
            {
                route: "/",
                itemName: data.value.username
            }
        ];
        user.value = data.value;
    }

    watch(() => isAuthenticated.value, async () => {
        if (isAuthenticated.value) {
            rightNavItemData.value = [
                {
                    route: "/",
                    itemName: user.value.username,
                }
            ];
            return;
        }
        rightNavItemData.value = unAuthenticatedNavItem;
    });

</script>

<template>
    <header>
        <nav>
            <ul>
                <div class="nav-item-container left-portion">
                    <li v-for="navItem in leftNavItemData">
                        <NuxtLink :to="navItem.route" class="nav-item" :class="route.path === navItem.route ? 'active': ''">
                            {{navItem.itemName}}
                        </NuxtLink>
                    </li>
                </div>
                <div class="nav-item-container right-portion">
                    <li v-for="navItem in rightNavItemData">
                        <NuxtLink :to="navItem.route" class="nav-item" :class="route.path === navItem.route ? 'active': ''">
                            {{navItem.itemName}}
                        </NuxtLink>
                    </li>
                </div>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
    ul {
        list-style: none;
        display: flex;
    }
    
    nav {
        border: 2px solid black;
    }

    .nav-item-container {
        display: flex;
        gap: 1rem;
    }
    .right-portion {
        margin-left: auto;
        margin-right: 2rem;
    }

    li, .nav-item {
        color: black;
        text-decoration: none;
    }

    .active {
        background-color: antiquewhite;
    }
</style>



