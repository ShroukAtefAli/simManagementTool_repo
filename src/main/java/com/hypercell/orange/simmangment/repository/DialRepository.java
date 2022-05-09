package com.hypercell.orange.simmangment.repository;

import com.hypercell.orange.simmangment.domain.Dial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Dial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DialRepository extends JpaRepository<Dial, Long> {}
